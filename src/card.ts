import {
  LitElement,
  html,
  css,
  PropertyValues,
  TemplateResult,
  nothing,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import memoizeOne from "memoize-one";
import {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from "custom-card-helpers";
import type { HassEntity, UnsubscribeFunc } from "home-assistant-js-websocket";
import {
  computeDomain,
  navigate,
  applyThemesOnElement,
  formatNumber,
  LovelaceConfig,
} from "custom-card-helpers";
import {
  AreaRegistryEntry,
  DeviceRegistryEntry,
  EntityRegistryEntry,
  subscribeAreaRegistry,
  subscribeDeviceRegistry,
  subscribeEntityRegistry,
  subscribeOne,
  SubscribeMixin,
  isNumericState,
  blankBeforeUnit,
} from "./helpers";
import { mdiClose } from "@mdi/js";
import { parse } from "yaml";

export interface CardConfig extends LovelaceCardConfig {
  area: string;
  navigation_path?: string;
  columns?: number;
}

const UNAVAILABLE_STATES = ["unavailable", "unknown"];

const STATES_OFF = [
  "closed",
  "locked",
  "off",
  "docked",
  "idle",
  "standby",
  "paused",
  "auto",
  "not_home",
  "disarmed",
];

const SENSOR_DOMAINS = ["sensor"];

const ALERT_DOMAINS = ["binary_sensor"];

export const CLIMATE_DOMAINS = ["climate"];

export const TOGGLE_DOMAINS = [
  "light",
  "switch",
  "fan",
  "media_player",
  "lock",
  "vacuum",
];

export const domainOrder = [
  "alarm_control_panel",
  "siren",
  "light",
  "switch",
  "media_player",
  "climate",
  "air_quality",
  "humdifier",
  "vacuum",
  "lawn_mower",
  "cover",
  "lock",
  "camera",
  "fan",
  "valve",
  "water_heater",
  "person",
  "calendar",
  "remote",
  "scene",
  "device_tracker",
  "update",
  "notifications",
  "binary_sensor",
  "sensor",
  "script",
  "tags",
  "select",
  "automation",
  "button",
  "number",
  "conversation",
  "assist_satellite",
  "counter",
  "event",
  "group",
  "image",
  "image_processing",
  "input_boolean",
  "input_datetime",
  "input_number",
  "input_select",
  "input_text",
  "stt",
  "sun",
  "text",
  "date",
  "datetime",
  "time",
  "timer",
  "todo",
  "tts",
  "wake_word",
  "weather",
  "zone",
  "geo_location",
];

export const DEVICE_CLASSES = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
};

type DomainType =
  | "light"
  | "switch"
  | "fan"
  | "climate"
  | "media_player"
  | "lock"
  | "vacuum"
  | "binary_sensor";

const DOMAIN_ICONS = {
  light: { on: "mdi:lightbulb-multiple", off: "mdi:lightbulb-multiple-off" },
  switch: { on: "mdi:toggle-switch", off: "mdi:toggle-switch-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  climate: { on: "mdi:fan", off: "mdi:fan-off" },
  media_player: { on: "mdi:cast", off: "mdi:cast-off" },
  lock: { on: "mdi:lock", off: "mdi:lock-open" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-off" },
  binary_sensor: {
    motion: "mdi:motion-sensor",
    moisture: "mdi:water-alert",
    window: "mdi:window-open",
    door: "mdi:door-open",
    lock: "mdi:lock",
    presence: "mdi:home",
    occupancy: "mdi:seat",
    vibration: "mdi:vibrate",
    opening: "mdi:shield-lock-open",
    garage_door: "mdi:garage-open",
    problem: "mdi:alert-circle",
    smoke: "mdi:smoke-detector",
  },
};

@customElement("area-card-plus")
export class AreaCardPlus
  extends SubscribeMixin(LitElement)
  implements LovelaceCard
{
  static getConfigElement() {
    return document.createElement("area-card-plus-editor");
  }

  public static async getStubConfig(hass: HomeAssistant): Promise<CardConfig> {
    const areas = await subscribeOne(hass.connection, subscribeAreaRegistry);
    return { type: "custom:area-card-plus", area: areas[0]?.area_id || "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: CardConfig;

  @state() private _areas?: AreaRegistryEntry[];
  @state() private _devices?: DeviceRegistryEntry[];
  @state() private _entities?: EntityRegistryEntry[];
  @state() private _showPopup: boolean = false;

  private _deviceClasses: { [key: string]: string[] } = DEVICE_CLASSES;

  private _entitiesByDomain = memoizeOne(
    (
      areaId: string,
      devicesInArea: Set<string>,
      registryEntities: EntityRegistryEntry[],
      deviceClasses: { [key: string]: string[] },
      states: HomeAssistant["states"]
    ) => {
      const hiddenEntities = this._config?.hidden_entities || [];
      const entitiesInArea = registryEntities
        .filter(
          (entry) =>
            !entry.hidden_by &&
            (entry.area_id
              ? entry.area_id === areaId
              : entry.device_id && devicesInArea.has(entry.device_id))
        )
        .map((entry) => entry.entity_id)
        .filter((entity) => !hiddenEntities.includes(entity));

      const entitiesByDomain: { [domain: string]: HassEntity[] } = {};

      for (const entity of entitiesInArea) {
        const domain = computeDomain(entity);

        if (
          !TOGGLE_DOMAINS.includes(domain) &&
          !SENSOR_DOMAINS.includes(domain) &&
          !ALERT_DOMAINS.includes(domain) &&
          !CLIMATE_DOMAINS.includes(domain)
        ) {
          continue;
        }

        const stateObj: HassEntity | undefined = states[entity];
        if (!stateObj) {
          continue;
        }

        if (
          (ALERT_DOMAINS.includes(domain) || SENSOR_DOMAINS.includes(domain)) &&
          !deviceClasses[domain].includes(
            stateObj.attributes.device_class || ""
          )
        ) {
          continue;
        }

        if (!(domain in entitiesByDomain)) {
          entitiesByDomain[domain] = [];
        }
        entitiesByDomain[domain].push(stateObj);
      }

      return entitiesByDomain;
    }
  );

  private _entitiesByArea = memoizeOne(
    (
      areaId: string,
      devicesInArea: Set<string>,
      registryEntities: EntityRegistryEntry[],
      states: HomeAssistant["states"]
    ) => {
      const popupDomains = this._config?.popup_domains || [];
      const hiddenEntities = this._config?.hidden_entities || [];
      const extraEntities = this._config?.extra_entities || [];

      const entitiesInArea = registryEntities
        .filter(
          (entry) =>
            !entry.hidden_by &&
            (entry.area_id
              ? entry.area_id === areaId
              : entry.device_id && devicesInArea.has(entry.device_id))
        )
        .map((entry) => entry.entity_id)
        .filter((entity) => !hiddenEntities.includes(entity))
        .filter(
          (entity) =>
            !this._config?.hide_unavailable ||
            !UNAVAILABLE_STATES.includes(states[entity]?.state)
        );

      const entitiesByArea: { [domain: string]: HassEntity[] } = {};

      for (const entity of entitiesInArea) {
        const domain = computeDomain(entity);

        if (popupDomains.length > 0 && !popupDomains.includes(domain)) {
          continue;
        }

        const stateObj: HassEntity | undefined = states[entity];
        if (!stateObj) {
          continue;
        }

        if (!(domain in entitiesByArea)) {
          entitiesByArea[domain] = [];
        }
        entitiesByArea[domain].push(stateObj);
      }

      for (const extraEntity of extraEntities) {
        const domain = computeDomain(extraEntity);

        if (!(domain in entitiesByArea)) {
          entitiesByArea[domain] = [];
        }

        const stateObj: HassEntity | undefined = states[extraEntity];
        if (stateObj) {
          entitiesByArea[domain].push(stateObj);
        }
      }

      const sortOrder = popupDomains.length > 0 ? popupDomains : domainOrder;

      const sortedEntitiesByArea = Object.entries(entitiesByArea)
        .sort(([domainA], [domainB]) => {
          const indexA = sortOrder.indexOf(domainA);
          const indexB = sortOrder.indexOf(domainB);

          const adjustedIndexA = indexA === -1 ? sortOrder.length : indexA;
          const adjustedIndexB = indexB === -1 ? sortOrder.length : indexB;

          return adjustedIndexA - adjustedIndexB;
        })
        .reduce((acc, [domain, entities]) => {
          const sortedEntities = entities.sort((a, b) => {
            const stateA = a.state;
            const stateB = b.state;

            const getGroup = (state: string) => {
              if (
                !STATES_OFF.includes(state) &&
                !UNAVAILABLE_STATES.includes(state)
              ) {
                return 0;
              } else if (
                STATES_OFF.includes(state) &&
                !UNAVAILABLE_STATES.includes(state)
              ) {
                return 1;
              } else {
                return 2;
              }
            };

            const groupA = getGroup(stateA);
            const groupB = getGroup(stateB);

            if (groupA !== groupB) {
              return groupA - groupB;
            }

            return a.entity_id.localeCompare(b.entity_id);
          });

          acc[domain] = sortedEntities;
          return acc;
        }, {} as { [domain: string]: HassEntity[] });

      return sortedEntitiesByArea;
    }
  );

  private _isOn(domain: string, deviceClass?: string): HassEntity | undefined {
    const entities = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
      this._deviceClasses,
      this.hass.states
    )[domain];
    if (!entities) {
      return undefined;
    }
    return (
      deviceClass
        ? entities.filter(
            (entity) => entity.attributes.device_class === deviceClass
          )
        : entities
    ).find(
      (entity) =>
        !UNAVAILABLE_STATES.includes(entity.state) &&
        !STATES_OFF.includes(entity.state)
    );
  }

  private _average(domain: string, deviceClass?: string): string | undefined {
    const entities = this._entitiesByDomain(
      this._config!.area,
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
      this._deviceClasses,
      this.hass.states
    )[domain].filter((entity) =>
      deviceClass ? entity.attributes.device_class === deviceClass : true
    );
    if (!entities) {
      return undefined;
    }
    let uom: any;
    const values = entities.filter((entity) => {
      if (!isNumericState(entity) || isNaN(Number(entity.state))) {
        return false;
      }
      if (!uom) {
        uom = entity.attributes.unit_of_measurement;
        return true;
      }
      return entity.attributes.unit_of_measurement === uom;
    });
    if (!values.length) {
      return undefined;
    }
    const sum = values.reduce(
      (total, entity) => total + Number(entity.state),
      0
    );
    return `${formatNumber(sum / values.length, this.hass!.locale as any, {
      maximumFractionDigits: 1,
    })}${uom ? blankBeforeUnit(uom, this.hass!.locale as any) : ""}${
      uom || ""
    }`;
  }

  private _area = memoizeOne(
    (areaId: string | undefined, areas: AreaRegistryEntry[]) =>
      areas.find((area) => area.area_id === areaId) || null
  );

  private _devicesInArea = memoizeOne(
    (areaId: string | undefined, devices: DeviceRegistryEntry[]) =>
      new Set(
        areaId
          ? devices
              .filter((device) => device.area_id === areaId)
              .map((device) => device.id)
          : []
      )
  );

  public hassSubscribe(): UnsubscribeFunc[] {
    return [
      subscribeAreaRegistry(this.hass!.connection, (areas) => {
        this._areas = areas;
      }),
      subscribeDeviceRegistry(this.hass!.connection, (devices) => {
        this._devices = devices;
      }),
      subscribeEntityRegistry(this.hass!.connection, (entries) => {
        this._entities = entries;
      }),
    ];
  }

  public getCardSize(): number {
    return 3;
  }

  public setConfig(config: CardConfig): void {
    if (!config.area) {
      throw new Error("Area Required");
    }

    this._config = config;

    this._deviceClasses = { ...DEVICE_CLASSES };
    if (config.sensor_classes) {
      this._deviceClasses.sensor = config.sensor_classes;
    }
    if (config.alert_classes) {
      this._deviceClasses.binary_sensor = config.alert_classes;
    }
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config") || !this._config) {
      return true;
    }

    if (
      changedProps.has("_devicesInArea") ||
      changedProps.has("_areas") ||
      changedProps.has("_entities")
    ) {
      return true;
    }

    if (changedProps.has("_showPopup")) {
      return true;
    }

    if (!changedProps.has("hass")) {
      return false;
    }

    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;

    if (
      !oldHass ||
      oldHass.themes !== this.hass!.themes ||
      oldHass.locale !== this.hass!.locale
    ) {
      return true;
    }

    if (
      !this._devices ||
      !this._devicesInArea(this._config.area, this._devices) ||
      !this._entities
    ) {
      return false;
    }

    const entities = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    );

    for (const domainEntities of Object.values(entities)) {
      for (const stateObj of domainEntities) {
        if (oldHass!.states[stateObj.entity_id] !== stateObj) {
          return true;
        }
      }
    }

    return false;
  }

  protected render() {
    if (
      !this._config ||
      !this.hass ||
      !this._areas ||
      !this._devices ||
      !this._entities
    ) {
      return nothing;
    }

    const entitiesByDomain = this._entitiesByDomain(
      this._config.area,
      this._devicesInArea(this._config.area, this._devices),
      this._entities,
      this._deviceClasses,
      this.hass.states
    );
    const area = this._area(this._config.area, this._areas);

    const classes = {
      mirrored: this._config.mirrored === true,
    };

    if (area === null) {
      return html`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    }

    return html`
      <ha-card class="${classMap(classes)}">
      <div class="content">
          <div class="icon-container">
            <ha-icon style=${
              `${this._config?.area_icon_color ? `color: var(--${this._config.area_icon_color}-color);` : ""} 
              ${this._config?.icon_css
                ? this._config.icon_css
                    .split("\n")
                    .map((line: string) => line.trim())
                    .filter((line: string) => line && line.includes(":"))
                    .map((line: string) => (line.endsWith(";") ? line : `${line};`))
                    .join(" ")
                : ""}`}
              icon=${this._config.area_icon || area.icon}>
            </ha-icon>
          </div>
          <div class="container" @click="${() => this._handleClick()}">

          <div class="right">

          <div class="alerts">
            ${ALERT_DOMAINS.map((domain) => {
              if (!(domain in entitiesByDomain)) {
                return nothing;
              }

              return this._deviceClasses[domain].map((deviceClass) => {
                const activeEntities = entitiesByDomain[domain].filter(
                  (entity) => {
                    const entityDeviceClass =
                      entity.attributes.device_class || "default";
                    return (
                      entityDeviceClass === deviceClass && entity.state === "on"
                    );
                  }
                );

                const customization = this._config?.customization_alert?.find(
                  (item: { type: string }) => item.type === deviceClass
                );
                const alertColor = customization?.color || this._config?.alert_color;;
                const alertIcon = customization?.icon;

                const activeCount = activeEntities.length;

                return activeCount > 0
                  ? html`
                     <div
                      class="icon-with-count"
                      style=${this._config?.alert_css
                        ? this._config.alert_css
                            .split("\n") 
                            .map((line: string) => line.trim()) 
                            .filter((line: string) => line && line.includes(":")) 
                            .map((line: string) => (line.endsWith(";") ? line : `${line};`)) 
                            .join(" ") 
                        : ""}
                      @click=${(ev: Event) => this._toggle(ev, domain, deviceClass)}
                    >
                        <ha-state-icon
                          class="alert"
                          style=${alertColor ? `color: var(--${alertColor}-color);` : nothing}
                          .icon=${alertIcon
                            ? alertIcon
                            : this._getIcon(
                                domain as DomainType,
                                activeCount > 0,
                                deviceClass
                              )}
                        ></ha-state-icon>
                        <span
                          class="active-count  text-small${activeCount > 0
                            ? "on"
                            : "off"}"
                          >${activeCount}</span
                        >
                      </div>
                    `
                  : nothing;
              });
            })}
          </div>          

          <div class="buttons">
            ${
              this._config.show_active
                ? this._config.toggle_domains?.map((domain: string) => {
                    if (!(domain in entitiesByDomain)) {
                      return nothing;
                    }

                    if (domain === "climate") {
                      return nothing;
                    }

                    const customization =
                      this._config?.customization_domain?.find(
                        (item: { type: string }) => item.type === domain
                      );
                    const domainColor = customization?.color || this._config?.domain_color;
                    const domainIcon = customization?.icon;

                    const activeEntities = entitiesByDomain[domain].filter(
                      (entity) =>
                        !UNAVAILABLE_STATES.includes(entity.state) &&
                        !STATES_OFF.includes(entity.state)
                    );
                    const activeCount = activeEntities.length;

                    if (activeCount > 0) {
                      return html`
                          <div
                            class="icon-with-count hover"
                            style=${this._config?.domain_css
                              ? this._config.domain_css
                                  .split("\n") 
                                  .map((line: string) => line.trim()) 
                                  .filter((line: string) => line && line.includes(":")) 
                                  .map((line: string) => (line.endsWith(";") ? line : `${line};`)) 
                                  .join(" ") 
                              : ""}
                            @click=${(ev: Event) => this._toggle(ev, domain)}
                          >
                          <ha-state-icon
                            style=${domainColor ? `color: var(--${domainColor}-color);` : nothing}
                            class=${activeCount > 0
                              ? "toggle-on"
                              : "toggle-off"}
                            .domain=${domain}
                            .icon=${domainIcon
                              ? domainIcon
                              : this._getIcon(
                                  domain as DomainType,
                                  activeCount > 0
                                )}
                          ></ha-state-icon>
                          <span
                            class="active-count text-small ${activeCount > 0
                              ? "on"
                              : "off"}"
                          >
                            ${activeCount}
                          </span>
                        </div>
                      `;
                    } else {
                      return nothing;
                    }
                  })
                : this._config.toggle_domains?.map((domain: string) => {
                    if (!(domain in entitiesByDomain)) {
                      return nothing;
                    }

                    if (domain === "climate") {
                      return nothing;
                    }

                    const customization =
                      this._config?.customization_domain?.find(
                        (item: { type: string }) => item.type === domain
                      );
                    const domainColor = customization?.color;
                    const domainIcon = customization?.icon;

                    const activeEntities = entitiesByDomain[domain].filter(
                      (entity) =>
                        !UNAVAILABLE_STATES.includes(entity.state) &&
                        !STATES_OFF.includes(entity.state)
                    );
                    const activeCount = activeEntities.length;

                    return html`
                    <div
                      class="icon-with-count hover"
                      style=${this._config?.domain_css
                        ? this._config.domain_css
                            .split("\n") 
                            .map((line: string) => line.trim()) 
                            .filter((line: string) => line && line.includes(":")) 
                            .map((line: string) => (line.endsWith(";") ? line : `${line};`)) 
                            .join(" ") 
                        : ""}
                      @click=${(ev: Event) => this._toggle(ev, domain)}
                    >
                        <ha-state-icon
                          style=${domainColor
                            ? `color: var(--${domainColor}-color);`
                            : this._config?.domain_color
                            ? `color: ${this._config.domain_color};`
                            : nothing}
                          class=${activeCount > 0 ? "toggle-on" : "toggle-off"}
                          .domain=${domain}
                          .icon=${domainIcon
                            ? domainIcon
                            : this._getIcon(
                                domain as DomainType,
                                activeCount > 0
                              )}
                        ></ha-state-icon>
                        <span
                          class="active-count text-small ${activeCount > 0
                            ? "on"
                            : "off"}"
                        >
                          ${activeCount}
                        </span>
                      </div>
                    `;
                  })
            }
          </div>

          </div>
          <div class="bottom">
            <div>
              <div style=${
                `${this._config?.area_name_color ? `color: var(--${this._config.area_name_color}-color);` : ""} ${this._config?.name_css
                  ? this._config.name_css
                      .split("\n")
                      .map((line: string) => line.trim())
                      .filter((line: string) => line && line.includes(":"))
                      .map((line: string) => (line.endsWith(";") ? line : `${line};`))
                      .join(" ")
                  : ""}`}
                class="name text-large on">
                ${this._config.area_name || area.name}
              </div>

              <div class="sensors">
                ${SENSOR_DOMAINS.map((domain) => {
                  if (!(domain in entitiesByDomain)) {
                    return nothing;
                  }

                  const sensorElements = this._deviceClasses[domain]
                    .map((deviceClass, index, array) => {
                      const matchingEntities = entitiesByDomain[domain].filter(
                        (entity) =>
                          entity.attributes.device_class === deviceClass
                      );

                      if (matchingEntities.length === 0) {
                        return nothing;
                      }

                      const average = this._average(domain, deviceClass);

                      const customization =
                        this._config?.customization_sensor?.find(
                          (item: { type: string }) => item.type === deviceClass
                        );
                      const sensorColor =
                        customization?.color || this._config?.sensor_color;

                      return html`
                        <span
                          class="sensor-value"
                          @click=${(ev: Event) =>
                            this._toggle(ev, domain, deviceClass)}
                          style=${sensorColor
                            ? `color: var(--${sensorColor}-color);`
                            : nothing}
                        >
                          ${index > 0 ? " - " : ""}${average}
                        </span>
                      `;
                    })
                    .filter((element) => element !== nothing);

                  if (sensorElements.length === 0) {
                    return nothing;
                  }

                  return html`
                    <div class="sensor text-medium off">${sensorElements}</div>
                  `;
                })}
              </div>
            </div>
            <div class="climate text-small off" >
            ${
              this._config?.toggle_domains?.includes("climate")
                ? CLIMATE_DOMAINS.map((domain) => {
                    if (!(domain in entitiesByDomain)) {
                      return "";
                    }

                    const entities = entitiesByDomain[domain];
                    const activeTemperatures = entities
                    .filter((entity) => {
                      const hvacAction = entity.attributes.hvac_action;
                      const state = entity.state;
          
                      const isActive =
                        !UNAVAILABLE_STATES.includes(state) &&
                        !STATES_OFF.includes(state);
          
                      if (hvacAction !== undefined) {
                        const isHeatingCooling = hvacAction !== "idle" && hvacAction !== "off";
          
                        const isHeatButIdle =
                          state === "heat" && (hvacAction === "idle" || hvacAction === "off");
          
                        return isActive && isHeatingCooling && !isHeatButIdle;
                      }
          
                      return isActive;
                    })
                      .map((entity) => {
                        const temperature =
                          entity.attributes.temperature || "N/A";
                        return `${temperature} ${this.hass?.config?.unit_system?.temperature || ""}`;
                      });

                    if (activeTemperatures.length === 0) {
                      return "";
                    }

                    return html`
                      <div
                        class="climate"
                        @click=${(ev: Event) => this._toggle(ev, domain)}
                      >
                        (${activeTemperatures.join(", ")})
                      </div>
                    `;
                  })
                : ""
            }
            
            </div>
          </div>
          </div>
        </div>
        ${(() => {
          return this._showPopup ? this.renderPopup() : nothing;
        })()}
        
        </div>
      </ha-card>
    `;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (!this._config || !this.hass) {
      return;
    }

    const dialog = this.renderRoot?.querySelector("ha-dialog"); // Holt das ha-dialog direkt aus dem gerenderten Output
    const container = document.querySelector("home-assistant")?.shadowRoot;
    
    if (dialog && dialog.parentElement !== container) {
      container?.appendChild(dialog);
    }
    
        
    
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    const oldConfig = changedProps.get("_config") as CardConfig | undefined;

    if (
      (changedProps.has("hass") &&
        (!oldHass || oldHass.themes !== this.hass.themes)) ||
      (changedProps.has("_config") &&
        (!oldConfig || oldConfig.theme !== this._config.theme))
    ) {
      applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  private _handleNavigation() {
    if (this._config!.navigation_path) {
      navigate(undefined, this._config!.navigation_path);
    }
  }

  private _toggle(ev: Event, domain: string, deviceClass?: string): void {
    ev.stopPropagation();

    const customization_domain = this._config?.customization_domain?.find(
      (item: { type: string }) => item.type === domain
    );
    const toggle_action_domain = customization_domain?.tap_action;

    const customization_alert = this._config?.customization_alert?.find(
      (item: { type: string }) => item.type === deviceClass
    );
    const toggle_action_alert = customization_alert?.tap_action;

    const customization_sensor = this._config?.customization_sensor?.find(
      (item: { type: string }) => item.type === deviceClass
    );
    const toggle_action_sensor = customization_sensor?.tap_action;

    if (toggle_action_domain === "toggle") {
      if (domain === "media_player") {
        this.hass.callService(
          domain,
          this._isOn(domain) ? "media_pause" : "media_play",
          undefined,
          { area_id: this._config!.area }
        );
      } else if (domain === "lock") {
        this.hass.callService(
          domain,
          this._isOn(domain) ? "lock" : "unlock",
          undefined,
          { area_id: this._config!.area }
        );
      } else if (domain === "vacuum") {
        this.hass.callService(
          domain,
          this._isOn(domain) ? "stop" : "start",
          undefined,
          { area_id: this._config!.area }
        );
      } else if (TOGGLE_DOMAINS.includes(domain)) {
        this.hass.callService(
          domain,
          this._isOn(domain) ? "turn_off" : "turn_on",
          undefined,
          { area_id: this._config!.area }
        );
      }
    } else if (
      toggle_action_domain === "popup" ||
      toggle_action_domain === undefined
    ) {
      if (
        domain !== "binary_sensor" &&
        domain !== "sensor" &&
        domain !== "climate"
      ) {
        this._showPopupForDomain(domain);
      }
      if (domain === "climate" && toggle_action_domain === "popup") {
        this._showPopupForDomain(domain);
      }
    } else if (toggle_action_domain === "none") {
      return;
    }

    if (toggle_action_alert === "popup" || toggle_action_alert === undefined) {
      if (domain === "binary_sensor") {
        this._showPopupForDomain(domain, deviceClass);
      }
    } else if (toggle_action_alert === "none") {
      return;
    }

    if (toggle_action_sensor === "popup") {
      if (domain === "sensor") {
        this._showPopupForDomain(domain, deviceClass);
      }
    } else if (
      toggle_action_sensor === "none" ||
      toggle_action_sensor === undefined
    ) {
      return;
    }
  }

  private _showPopupForDomain(domain: string, deviceClass?: string): void {
    this._selectedDomain = domain;
    this._selectedDeviceClass = deviceClass;
    this._showPopup = true;

    this.updateComplete.then(() => {
      this.requestUpdate();
    });
  }

  private _getIcon(
    domain: DomainType,
    on: boolean,
    deviceClass?: string
  ): string {
    if (domain in DOMAIN_ICONS) {
      const icons = DOMAIN_ICONS[domain];

      if (
        deviceClass &&
        typeof icons === "object" &&
        !(icons as { on: string; off: string }).on
      ) {
        const deviceClassIcons = icons as Record<string, string>;
        if (deviceClass in deviceClassIcons) {
          return deviceClassIcons[deviceClass];
        }
      }

      if (typeof icons === "object" && "on" in icons && "off" in icons) {
        return on ? icons.on : icons.off;
      }
    }

    return "";
  }

  private _getDomainName(domain: string, deviceClass?: string): string {
    if (domain === "scene") {
      return "Scene";
    }

    if (domain === "binary_sensor" || domain === "sensor") {
      return deviceClass
        ? this.hass!.localize(
            `component.${domain}.entity_component.${deviceClass}.name`
          )
        : this.hass!.localize(`component.${domain}.entity_component._.name`);
    }

    return this.hass!.localize(`component.${domain}.entity_component._.name`);
  }

  createCard(cardConfig: { type: string; entity: string; [key: string]: any }) {
    let cardElement: LovelaceCard;
  
    if (cardConfig.type.startsWith('custom:')) {
      const customType = cardConfig.type.replace('custom:', '');
      cardElement = document.createElement(customType) as LovelaceCard;
    } else {
      cardElement = document.createElement(`hui-${cardConfig.type}-card`) as LovelaceCard;
    }
  
    if (cardElement) {
      cardElement.hass = this.hass;
      cardElement.setConfig(cardConfig);
      return cardElement;
    }
  
    return html`<p>Invalid Configuration for card type: ${cardConfig.type}</p>`;
  }

  private _handleClick(): void {
    if (this._config?.navigation_path) {
      this._handleNavigation();
    } else {
      this._showPopup = true;
      this._selectedDomain = undefined;
      this._selectedDeviceClass = undefined;
      this.requestUpdate();
    }
  }

  private _closeDialog(): void {
    this._showPopup = false;
  
    const container = document.querySelector("home-assistant")?.shadowRoot;
    const dialog = container?.querySelector("ha-dialog"); // Dialog direkt im neuen Container finden
    
    if (dialog && container?.contains(dialog)) {
      container.removeChild(dialog);
    }
  }
  

  connectedCallback(): void {
    super.connectedCallback();
    // Initiale Prüfung
    this._updateIsMobile();
    window.addEventListener("resize", this._updateIsMobile.bind(this));
  }

  disconnectedCallback(): void {
    window.removeEventListener("resize", this._updateIsMobile.bind(this));
    super.disconnectedCallback();
  }

  private _updateIsMobile(): void {
    this._isMobile = window.innerWidth <= 768;
  }

  private desktopStyles = `
  .tile-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .domain-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }
  .domain-group h4 {
    margin: 0;
    font-size: 1.2em;
  }
  .domain-entities {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: 4px;
  }
  .entity-card {
    width: 22.5vw;
  }
  .dialog-header { 
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    align-items: center;
  }
  .dialog-header ha-icon-button { 
    margin-right: 10px;  
  }
  ha-dialog#more-info-dialog {
    --mdc-dialog-max-width: calc(22.5vw * var(--columns) + 3vw);
    overflow: hidden;
  }
`;

// Mobile CSS als String
private mobileStyles = `
  .tile-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .domain-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
  }
  .domain-group h4 {
    margin: 0;
    font-size: 1.2em;
  }
  .domain-entities {
    display: grid;
    grid-template-columns: 1fr !important;
    gap: 4px;
  }
  .dialog-header { 
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    align-items: center;
  }    
  .entity-card {
    flex-basis: 100%;
    width: 100% !important;
    overflow: hidden;
  }
  ha-dialog#more-info-dialog {
    --mdc-dialog-min-width: 96vw;
    --mdc-dialog-max-width: 96vw;
    --columns: 1;
    max-width: 100%;
    padding: 16px;
    overflow: hidden;
  }
`;

  private renderPopup(): TemplateResult {
    const entitiesByArea = this._entitiesByArea(
      this._config!.area,
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
      this.hass.states
    );
  
    const area = this._area(this._config!.area, this._areas!);
    let columns = this._config?.columns ? this._config.columns : 4;
  
    const entitiesToRender: Record<string, HassEntity[]> = this
      ._selectedDeviceClass
      ? {
          [this._selectedDomain]: (
            entitiesByArea[this._selectedDomain] || []
          ).filter(
            (entity) =>
              entity.attributes.device_class === this._selectedDeviceClass
          ),
        }
      : this._selectedDomain
      ? { [this._selectedDomain]: entitiesByArea[this._selectedDomain] || [] }
      : entitiesByArea;
  
    let maxEntityCount = 0;
    Object.entries(entitiesToRender).forEach(([domain, entities]) => {
      const entityCount = entities.length;
      if (entityCount > maxEntityCount) {
        maxEntityCount = entityCount;
      }
    });
  
    if (maxEntityCount === 1) columns = 1;
    else if (maxEntityCount === 2) columns = Math.min(columns, 2);
    else if (maxEntityCount === 3) columns = Math.min(columns, 3);
    else columns = Math.min(columns, 4);
  
    this.style.setProperty("--columns", columns.toString());

    const styleBlock = this._isMobile ? this.mobileStyles : this.desktopStyles;
  
    return html`
      <ha-dialog
      id="more-info-dialog"
        style="--columns: ${columns};"
        open
        @closed="${this._closeDialog}"
      >
         <style>
          ${styleBlock}
        </style>
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            .path=${mdiClose}
            @click=${this._closeDialog}
            .label=${this.hass!.localize("ui.common.close")}
          ></ha-icon-button>
          <div slot="title">
            <h3>${this._config?.area_name || area?.name}</h3>
          </div>
        </div>
  
        <div class="tile-container">
          ${Object.entries(entitiesToRender).map(
            ([domain, entities]) => html`
              <div class="domain-group">
                <h4>
                  ${domain === "binary_sensor" || domain === "sensor"
                    ? this._getDomainName(domain, this._selectedDeviceClass)
                    : this._getDomainName(domain)}
                </h4>
                <div class="domain-entities">
                  ${entities.map(
                    (entity: HassEntity) => {
                      // Überprüfen, ob eine benutzerdefinierte Kartenkonfiguration für diese Domäne existiert
                      const customization = this._config?.customization_popup?.find(
                        (c: any) => c.type === domain
                      );

let cardType: string | undefined;
let cardFeatures: Record<string, any> | undefined = undefined;

if (customization?.card) {
  try {
    // Parsing der Card-Konfiguration
    const parsedCard = parse(customization.card);
    cardType = parsedCard.type;
    
    // Restliche Konfiguration ohne den 'type' extrahieren
    const { type, ...restOfCard } = parsedCard;
    cardFeatures = restOfCard;
  } catch (e) {
    console.error('Error parsing card configuration:', e);
  }
}
  
                      // Standardkarte erstellen, falls keine benutzerdefinierte Konfiguration vorhanden ist
                      const cardConfig = cardType
                        ? { type: cardType, entity: entity.entity_id, ...cardFeatures }
                        : {
                            type: "tile",
                            entity: entity.entity_id,
                            ...(domain === "alarm_control_panel" && {
                              features: [
                                {
                                  type: "alarm-modes",
                                  modes: [
                                    "armed_home",
                                    "armed_away",
                                    "armed_night",
                                    "armed_vacation",
                                    "armed_custom_bypass",
                                    "disarmed",
                                  ],
                                },
                              ],
                            }),
                            ...(domain === "light" && {
                              features: [{ type: "light-brightness" }],
                            }),
                            ...(domain === "cover" && {
                              features: [
                                { type: "cover-open-close" },
                                { type: "cover-position" },
                              ],
                            }),
                            ...(domain === "vacuum" && {
                              features: [
                                {
                                  type: "vacuum-commands",
                                  commands: [
                                    "start_pause",
                                    "stop",
                                    "clean_spot",
                                    "locate",
                                    "return_home",
                                  ],
                                },
                              ],
                            }),
                            ...(domain === "climate" && {
                              features: [
                                {
                                  type: "climate-hvac-modes",
                                  hvac_modes: [
                                    "auto",
                                    "heat_cool",
                                    "heat",
                                    "cool",
                                    "dry",
                                    "fan_only",
                                    "off",
                                  ],
                                },
                              ],
                            }),
                            ...(domain === "media_player" && {
                              features: [{ type: "media-player-volume-slider" }],
                            }),
                            ...(domain === "lock" && {
                              features: [{ type: "lock-commands" }],
                            }),
                            ...(domain === "fan" && {
                              features: [{ type: "fan-speed" }],
                            }),
                            ...(domain === "switch" && {
                              features: [{ type: "toggle" }],
                            }),
                            ...(domain === "counter" && {
                              features: [{ type: "counter-actions", actions: ["increment", "decrement", "reset"] }],
                            }),                            
                            ...(domain === "update" && {
                              features: [
                                { type: "update-actions", backup: "ask" },
                              ],
                            }),
                          };
  
                      return html`
                        <div class="entity-card">
                          ${this.createCard(cardConfig)}
                        </div>
                      `;
                    }
                  )}
                </div>
              </div>
            `
          )}
        </div>
      </ha-dialog> 
    `;
  }

  static get styles() {
    return css`
      ha-card {
        overflow: hidden;
        position: relative;
        height: 100%;
      }
      .content {
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;    
        min-height: 145px;    
      }        
      .icon-container {
        position: absolute;
        top: 16px;
        left: 16px;
        font-size: 64px; 
        color: var(--primary-color);
      }
      .mirrored .icon-container {
        left: unset;
        right: 16px;
      }
      @supports (--row-size: 1) {
        .icon-container ha-icon {
          --mdc-icon-size: calc(var(--row-size, 3) * 20px);
        }
      }
      .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
      .right {
        display: flex;
        flex-direction: row; 
        justify-content: flex-end; 
        align-items: flex-start; 
        position: absolute;
        top: 8px;
        right: 8px;
        gap: 7px; 
      }
      .mirrored .right {
        right: unset;
        left: 8px;
        flex-direction: row-reverse;
      }
      .alerts {
        display: flex;
        flex-direction: column;
        align-items: center; 
        justify-content: center; 
        margin-right: -3px;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 2px; 
      }
      .bottom {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: absolute;
        bottom: 8px;
        left: 16px;
      }
      .mirrored .bottom {
        left: unset;
        right: 16px;
        text-align: end;
        align-items: end;
      }        
      .name {
        font-weight: bold;
        margin-bottom: 8px;
      }
      .icon-with-count {
        display: flex;
        align-items: center; 
        gap: 5px; 
        background: none;
          border: solid 0.025rem rgba(var(--rgb-primary-text-color), 0.15);
          padding: 1px;
          border-radius: 5px;
          --mdc-icon-size: 20px;
      }
      .toggle-on {
        color: var(--primary-text-color);
      }
      .toggle-off {
        color: var(--secondary-text-color) !important;
      }          
      .off {
        color: var(--secondary-text-color);
      }            
      .navigate {
        cursor: pointer;
      }   
      .hover:hover {
        background-color: rgba(var(--rgb-primary-text-color), 0.15);
      }    
      .text-small {
        font-size: 0.9em; 
      }
      .text-medium {
        font-size: 1em;
      }
      .text-large {
        font-size: 1.3em;
      }  

      @media (max-width: 768px) {
        .content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;    
          min-height: 140px;    
        }  
        .name {
        font-weight: bold;
        margin-bottom: 5px;
      }
}


    `;
  }
}
