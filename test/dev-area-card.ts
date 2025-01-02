import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.0/index.js?module';
import { memoizeOne } from 'https://unpkg.com/memoize-one@5.2.1/dist/memoize-one.js?module';
import { computeDomain} from 'https://unpkg.com/browse/custom-card-helpers@1.9.0/dist/index.js?module';
import { HomeAssistant, HassEntity } from 'https://unpkg.com/browse/custom-card-helpers@1.9.0/dist/index.js?module';


interface Area {
  area_id: string;
  name: string;
  icon?: string;
}

interface Device {
  id: string;
  area_id?: string;
}

interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string;
  area_id?: string;
  entity_category?: string;
  hidden_by?: string;
}

interface DeviceClasses {
  [key: string]: string[];
}

interface Config {
  area_id: string;
}

@customElement("custom-area-card")
export class CustomAreaCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Object }) public config!: Config;

  @state() private areas: Area[] = [];
  @state() private devices: Device[] = [];
  @state() private entities: EntityRegistryEntry[] = [];
  @state() private entitiesByDomain: { [domain: string]: HassEntity[] } = {};

  private _entitiesByDomain = memoizeOne(
    (
      areaId: string,
      devicesInArea: Set<string>,
      registryEntities: EntityRegistryEntry[],
      deviceClasses: DeviceClasses,
      states: HomeAssistant["states"]
    ): { [domain: string]: HassEntity[] } => {
      const entitiesInArea = registryEntities
        .filter(
          (entry) =>
            !entry.entity_category &&
            !entry.hidden_by &&
            (entry.area_id
              ? entry.area_id === areaId
              : entry.device_id && devicesInArea.has(entry.device_id))
        )
        .map((entry) => entry.entity_id);

      const entitiesByDomain: { [domain: string]: HassEntity[] } = {};

      for (const entity of entitiesInArea) {
        const domain = computeDomain(entity);
        if (!["light", "switch", "sensor", "alert"].includes(domain)) {
          continue;
        }
        const stateObj = states[entity];
        if (!stateObj) continue;

        if (
          (["sensor", "alert"].includes(domain)) &&
          !deviceClasses[domain]?.includes(
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

  public setConfig(config: Config): void {
    if (!config || !config.area_id) {
      throw new Error("Invalid configuration. `area_id` is required.");
    }
    this.config = config;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    try {
      const [areas, devices, entities]: [Area[], Device[], EntityRegistryEntry[]] = await Promise.all([
        this.hass.callWS({ type: "config/area_registry/list" }),
        this.hass.callWS({ type: "config/device_registry/list" }),
        this.hass.callWS({ type: "config/entity_registry/list" }),
      ]);

      this.areas = areas;
      this.devices = devices;
      this.entities = entities;

      this._processEntities();
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  private _processEntities(): void {
    if (!this.config.area_id) return;

    const devicesInArea = new Set(
      this.devices
        .filter((device) => device.area_id === this.config.area_id)
        .map((device) => device.id)
    );

    const deviceClasses: DeviceClasses = {
      sensor: ["temperature", "humidity"],
      alert: ["motion", "door"],
    };

    this.entitiesByDomain = this._entitiesByDomain(
      this.config.area_id,
      devicesInArea,
      this.entities,
      deviceClasses,
      this.hass.states
    );
  }

  protected render() {
    const area = this.areas.find((a) => a.area_id === this.config.area_id);
    if (!area) return html`<div>Loading...</div>`;

    const areaName = area.name || "Unnamed Area";
    const icon = area.icon || "mdi:home";

    return html`
      <ha-card>
        <div class="card-content">
          <ha-icon icon="${icon}" class="area-icon"></ha-icon>
          <div class="details">
            <div class="name">${areaName}</div>
            <div class="stats">
              ${Object.keys(this.entitiesByDomain).map(
                (domain) =>
                  html`<div>
                    <strong>${domain}:</strong>
                    ${this.entitiesByDomain[domain].length} Entitäten
                  </div>`
              )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-card {
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--card-background-color);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, none);
      }
      .card-content {
        display: flex;
        align-items: center;
        width: 100%;
      }
      .area-icon {
        font-size: 48px;
        color: var(--primary-color);
        margin-right: 16px;
      }
      .details {
        flex: 1;
      }
      .name {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-text-color);
      }
      .stats {
        font-size: 14px;
        color: var(--secondary-text-color);
      }
    `;
  }
}