import { LitElement, html, css, PropertyValues, TemplateResult, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { customElement, property, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";
import type { HassEntity, UnsubscribeFunc } from "home-assistant-js-websocket";
import { computeDomain, navigate, applyThemesOnElement, formatNumber } from "custom-card-helpers";
import {
  AreaRegistryEntry, DeviceRegistryEntry, EntityRegistryEntry, subscribeAreaRegistry, subscribeDeviceRegistry, subscribeEntityRegistry,
  subscribeOne, SubscribeMixin, isNumericState, blankBeforeUnit
} from "./helpers";

export interface CardConfig extends LovelaceCardConfig {
  area: string;
  navigation_path?: string;
  columns?: number;
}

const UNAVAILABLE_STATES = ["unavailable", "unknown"];

const STATES_OFF = ["closed", "locked", "off", "docked", "idle", "standby", "paused", "auto", "not_home", "disarmed"];

const SENSOR_DOMAINS = ["sensor"];

const ALERT_DOMAINS = ["binary_sensor"];

const CLIMATE_DOMAINS = ["climate"];

export const TOGGLE_DOMAINS = ["light", "switch", "fan", "media_player", "lock", "vacuum"];

export const DEVICE_CLASSES = {
  sensor: ["temperature", "humidity"],
  binary_sensor: ["motion", "window"],
};


type DomainType = "light" | "switch" | "fan" | "climate" | "media_player" | "lock" | "vacuum" | "binary_sensor";

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

@customElement("custom-area-card")
export class CustomAreaCard extends SubscribeMixin(LitElement) implements LovelaceCard {

  static getConfigElement() {
    return document.createElement("custom-area-card-editor");
  }

  public static async getStubConfig(
    hass: HomeAssistant
  ): Promise<CardConfig> {
    const areas = await subscribeOne(hass.connection, subscribeAreaRegistry);
    return { type: "custom:custom-area-card", area: areas[0]?.area_id || "" };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: CardConfig;

  @state() private _areas?: AreaRegistryEntry[];
  @state() private _devices?: DeviceRegistryEntry[];
  @state() private _entities?: EntityRegistryEntry[];
  @state() public _showPopup: boolean = false;

  private _deviceClasses: { [key: string]: string[] } = DEVICE_CLASSES;


  private _entitiesByDomain = memoizeOne(
    (
      areaId: string,
      devicesInArea: Set<string>,
      registryEntities: EntityRegistryEntry[],
      deviceClasses: { [key: string]: string[] },
      states: HomeAssistant["states"]
    ) => {
      const entitiesInArea = registryEntities
        .filter(
          (entry) =>
            !entry.hidden_by &&
            (entry.area_id
              ? entry.area_id === areaId
              : entry.device_id && devicesInArea.has(entry.device_id))
        )
        .map((entry) => entry.entity_id);

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
          !deviceClasses[domain].includes(stateObj.attributes.device_class || "")
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
      const entitiesInArea = registryEntities
        .filter(
          (entry) =>
            !entry.hidden_by &&
            (entry.area_id
              ? entry.area_id === areaId
              : entry.device_id && devicesInArea.has(entry.device_id))
        )
        .map((entry) => entry.entity_id);

      const entitiesByArea: { [domain: string]: HassEntity[] } = {};

      for (const entity of entitiesInArea) {
        const domain = computeDomain(entity);


        const stateObj: HassEntity | undefined = states[entity];
        if (!stateObj) {
          continue;
        }


        if (!(domain in entitiesByArea)) {
          entitiesByArea[domain] = [];
        }
        entitiesByArea[domain].push(stateObj);
      }

      return entitiesByArea;
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
        !UNAVAILABLE_STATES.includes(entity.state) && !STATES_OFF.includes(entity.state)
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
    })}${uom ? blankBeforeUnit(uom, this.hass!.locale as any) : ""}${uom || ""}`;
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
    // Prüfe, ob _config fehlt oder sich geändert hat
    if (changedProps.has("_config") || !this._config) {
      return true;
    }
  
    // Prüfe, ob sich relevante Eigenschaften geändert haben
    if (
      changedProps.has("_devicesInArea") ||
      changedProps.has("_areas") ||
      changedProps.has("_entities")
    ) {
      return true;
    }
  
    // Spezielle Prüfung für _showPopup
    if (changedProps.has("_showPopup")) {
      return true; // Render auslösen, wenn sich _showPopup geändert hat
    }
  
    // Prüfe Änderungen an hass
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
  
    // Prüfe, ob Geräte und Entitäten vollständig sind
    if (
      !this._devices ||
      !this._devicesInArea(this._config.area, this._devices) ||
      !this._entities
    ) {
      return false;
    }
  
    // Prüfe spezifische Änderungen an Entitäten
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
  
    return false; // Kein Update erforderlich
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

    if (area === null) {
      return html`
        <hui-warning>
          ${this.hass.localize("ui.card.area.area_not_found")}
        </hui-warning>
      `;
    }


/*
          <div
            class="container ${classMap({
      navigate: this._config.navigation_path !== undefined && this._config.navigation_path !== "",
    })}"
            @click=${this._handleNavigation}>
*/


    return html`
      <ha-card>
          <div class="icon-container">
            <ha-icon style=${this._config?.area_icon_color ? `color: var(--${this._config.area_icon_color}-color);` : nothing} icon=${this._config.area_icon || area.icon}></ha-icon>
          </div>
<div class="container" @click="${() => this._handleClick()}">

          <div class="right">

          <div class="alerts">
            ${ALERT_DOMAINS.map((domain) => {
      if (!(domain in entitiesByDomain)) {
        return nothing;
      }



      return this._deviceClasses[domain].map((deviceClass) => {
        const activeEntities = entitiesByDomain[domain].filter((entity) => {
          const entityDeviceClass = entity.attributes.device_class || "default";
          return entityDeviceClass === deviceClass && entity.state === "on";
        });

        const customization = this._config?.customization_alert?.find(
          (item: { type: string }) => item.type === deviceClass
        );
        const alertColor = customization?.color;
        const alertIcon = customization?.icon;

        const activeCount = activeEntities.length;

        return activeCount > 0
          ? html`
                      <div class="icon-with-count">
                        <ha-state-icon
                          class="alert" style=${alertColor ? `color: var(--${alertColor}-color);` : this._config?.alert_color ? `color: ${this._config.alert_color};` : nothing}
                          .icon=${alertIcon ? alertIcon : this._getIcon(domain as DomainType, activeCount > 0, deviceClass)}
                        ></ha-state-icon>
                        <span class="active-count  text-small${activeCount > 0 ? "on" : "off"}">${activeCount}</span>
                      </div>
                    `
          : nothing;
      });
    })}
          </div>          

<div class="buttons">
  ${this._config.show_active
        ? this._config.toggle_domains?.map((domain: string) => {
          if (!(domain in entitiesByDomain)) {
            return nothing;
          }

          const customization = this._config?.customization_domain?.find(
            (item: { type: string }) => item.type === domain
          );
          const domainColor = customization?.color;
          const domainIcon = customization?.icon;


          const activeEntities = entitiesByDomain[domain].filter(
            (entity) => !UNAVAILABLE_STATES.includes(entity.state) && !STATES_OFF.includes(entity.state)
          );
          const activeCount = activeEntities.length;

          if (activeCount > 0) {
            return html`
            <div class="icon-with-count hover">
              <ha-state-icon
                style=${domainColor ? `color: var(--${domainColor}-color);` : this._config?.domain_color ? `color: ${this._config.domain_color};` : nothing}
                class=${activeCount > 0 ? "toggle-on" : "toggle-off"}
                .domain=${domain}
                .icon=${domainIcon ? domainIcon : this._getIcon(domain as DomainType, activeCount > 0)}
                @click=${this._toggle}
              ></ha-state-icon>
              <span class="active-count text-small ${activeCount > 0 ? "on" : "off"}">${activeCount}</span>
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

          const customization = this._config?.customization_domain?.find(
            (item: { type: string }) => item.type === domain
          );
          const domainColor = customization?.color;
          const domainIcon = customization?.icon;

          const activeEntities = entitiesByDomain[domain].filter(
            (entity) => !UNAVAILABLE_STATES.includes(entity.state) && !STATES_OFF.includes(entity.state)
          );
          const activeCount = activeEntities.length;

          return html`
          <div class="icon-with-count hover">
            <ha-state-icon
              style=${domainColor ? `color: var(--${domainColor}-color);` : this._config?.domain_color ? `color: ${this._config.domain_color};` : nothing}
              class=${activeCount > 0 ? "toggle-on" : "toggle-off"}
              .domain=${domain}
              .icon=${domainIcon ? domainIcon : this._getIcon(domain as DomainType, activeCount > 0)}
              @click=${this._toggle}
            ></ha-state-icon>
            <span class="active-count text-small ${activeCount > 0 ? "on" : "off"}">${activeCount}</span>
          </div>
        `;
        })
      }
</div>
          </div>
          <div class="bottom">
            <div>
              <div style=${this._config?.area_name_color ? `color: var(--${this._config.area_name_color}-color);` : nothing} class="name text-large on">${this._config.area_name || area.name}</div>
              <div class="sensors">
                ${SENSOR_DOMAINS.map((domain) => {
        if (!(domain in entitiesByDomain)) {
          return nothing;
        }

        const sensorElements = this._deviceClasses[domain]
          .map((deviceClass, index, array) => {
            const matchingEntities = entitiesByDomain[domain].filter(
              (entity) => entity.attributes.device_class === deviceClass
            );

            if (matchingEntities.length === 0) {
              return nothing;
            }

            const average = this._average(domain, deviceClass);

            const customization = this._config?.customization_sensor?.find(
              (item: { type: string }) => item.type === deviceClass
            );
            const sensorColor = customization?.color || this._config?.sensor_color;

            return html`
                        <span
                          class="sensor-value"
                          style=${sensorColor ? `color: var(--${sensorColor}-color);` : nothing}
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
                    <div class="sensor text-medium off">
                      ${sensorElements}
                    </div>
                  `;
      })}
              </div>
            </div>
            <div class="climate text-small off">
            ${CLIMATE_DOMAINS.map((domain) => {
        if (!(domain in entitiesByDomain)) {
          return "";
        }

        const entities = entitiesByDomain[domain];
        const activeTemperatures = entities
          .filter((entity) => {
            const hvacAction = entity.attributes.hvac_action;
            const isActive =
              !UNAVAILABLE_STATES.includes(entity.state) &&
              !STATES_OFF.includes(entity.state);
            const isHeatingCooling = hvacAction && (hvacAction !== "idle" || hvacAction === "off");

            return isActive || isHeatingCooling;
          })
          .map((entity) => {
            const temperature = entity.attributes.temperature || "N/A";
            return `${temperature}°C`;
          });

        if (activeTemperatures.length === 0) {
          return "";
        }

        return html`
                (${activeTemperatures.join(", ")})
              `;
      })}
            </div>
          </div>
          </div>
        </div>
        ${(() => {
          console.log("Render State:", this._showPopup);
          return this._showPopup ? this.renderPopup() : nothing;
        })()}
        

      </ha-card>
    `;
  }

  createCard(cardConfig: { type: string, entity: string, [key: string]: any }) {
    const cardElement = document.createElement(`hui-${cardConfig.type}-card`) as LovelaceCard;
    if (cardElement) {
      cardElement.hass = this.hass;
      cardElement.setConfig(cardConfig);
      return cardElement;
    }
    return html`<p>Invalid Configuration for card type: ${cardConfig.type}</p>`;
  }

  private _getDomainName(domain: string): string {
    if (domain === "scene") {
      return "Scene"; // Gibt "Scene" aus, wenn die Domain "scene" ist
    }
  
    // Gibt den lokalisierten Namen der Domain aus
    return this.hass!.localize(`component.${domain}.entity_component._.name`) || domain;
  }
  

  public renderPopup(): TemplateResult {
    const entitiesByArea = this._entitiesByArea(
      this._config!.area,
      this._devicesInArea(this._config!.area, this._devices!),
      this._entities!,
      this.hass.states
    );

    const area = this._area(this._config!.area, this._areas!);

    const columns = this._config?.columns ? this._config.columns : 4; 
  
    // Rendering der Popup-Dialoge
    return html`
      <ha-dialog id="more-info-dialog" style="--columns: ${columns};" open @closed="${this._closeDialog}">
        <div class="dialog-header">
          <ha-icon-button
            slot="navigationIcon"
            dialogaction="cancel"
            @click=${this._closeDialog}
            title="Close"
          >
            <ha-icon class="center" icon="mdi:close"></ha-icon>
          </ha-icon-button>
          <h3>
            Bereich: ${this._config!.area_name || area!.name}
          </h3>
        </div>
        <div class="tile-container">
          ${Object.entries(entitiesByArea).map(([domain, entities]) => html`
            <div class="domain-group">
              <h4>${this._getDomainName(domain)}</h4>
              <div class="domain-entities">
                ${entities.map((entity: HassEntity) => html`
                  <div class="entity-card">
                    ${this.createCard({
                      type: "tile",
                      entity: entity.entity_id,
                      ...(domain === "light" && { features: [{ type: "light-brightness" }] }),
                      ...(domain === "cover" && {
                        features: [{ type: "cover-open-close" }, { type: "cover-position" }],
                      }),
                    })}
                  </div>
                `)}
              </div>
            </div>
          `)}
        </div>
      </ha-dialog>
    `;
  }
  

  public _handleClick(): void {
    if (this._config?.navigation_path) {
      this._handleNavigation();
    } else {
      this._showPopup = true;
        this.requestUpdate();
    }
  }
  
  private _closeDialog(): void {
    this._showPopup = false;
  }
  


  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (!this._config || !this.hass) {
      return;
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
    if (changedProps.has("_showPopup") && this._showPopup) {
      this.renderPopup();
    }
  }

  

  private _handleNavigation() {
    if (this._config!.navigation_path) {
      navigate(undefined, this._config!.navigation_path);
    }
  }


  private _toggle(ev: Event) {
    ev.stopPropagation();
    const domain = (ev.currentTarget as any).domain as string;

    if (domain === "media_player") {
      this.hass.callService(
        domain,
        this._isOn(domain) ? "media_pause" : "media_play",
        undefined,
        {
          area_id: this._config!.area,
        }
      );
    }
    else if (domain === "lock") {
      this.hass.callService(
        domain,
        this._isOn(domain) ? "lock" : "unlock",
        undefined,
        {
          area_id: this._config!.area,
        }
      );
    }
    else if (domain === "vacuum") {
      this.hass.callService(
        domain,
        this._isOn(domain) ? "stop" : "start",
        undefined,
        {
          area_id: this._config!.area,
        }
      );
    }
    else if (TOGGLE_DOMAINS.includes(domain)) {
      this.hass.callService(
        domain,
        this._isOn(domain) ? "turn_off" : "turn_on",
        undefined,
        {
          area_id: this._config!.area,
        }
      );
    }
  }

  private _getIcon(domain: DomainType, on: boolean, deviceClass?: string): string {
    if (domain in DOMAIN_ICONS) {
      const icons = DOMAIN_ICONS[domain];

      if (deviceClass && typeof icons === "object" && !(icons as { on: string; off: string }).on) {
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



  static get styles() {
    return css`
      ha-card {
        overflow: hidden;
        position: relative;
        background-size: cover;
        height: auto;
        min-height: 180px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .icon-container {
        position: absolute;
        top: 16px;
        left: 16px;
        font-size: 64px; 
        color: var(--primary-color);
      }
      .icon-container ha-icon {
        --mdc-icon-size: 60px;
        color: var(--sidebar-selected-icon-color);
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
      .dialog-header { 
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
      } 
      .dialog-header ha-icon-button { 
        margin-right: 10px;  
      }
      ha-dialog#more-info-dialog {
        --mdc-dialog-max-width: calc(22.5vw * var(--columns) + 3vw);
        width: 100%;
        max-width: 90vw; 
        overflow: hidden; 
      }

      .tile-container {
        display: flex;
        flex-direction: column; 
        gap: 16px; 
      }

      .domain-group {
        display: flex;
        flex-direction: column; 
        gap: 8px; 
      }

      .domain-group h4 {
        margin: 0;
        font-size: 1.2em;
      }

      .domain-entities {
        display: grid;
        grid-template-columns: repeat(var(--columns), 1fr);
        gap: 8px; 
      }

      .entity-card {
        width: 100%;
      }

      @media (max-width: 768px) {
        ha-dialog#more-info-dialog {
          --columns: 1; 
          max-width: 100%;
          padding: 16px;
        }

        .domain-entities {
          grid-template-columns: 1fr; 
        }

        .entity-card {
          flex-basis: 100%; 
          max-width: 100%;
          overflow: hidden; 
        }
}


    `;
  }




}