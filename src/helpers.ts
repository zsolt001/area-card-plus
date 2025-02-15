import type {
  HassEntity,
  HassEntityAttributeBase,
} from "home-assistant-js-websocket";
import memoizeOne from "memoize-one";
import { HomeAssistant, debounce, ActionConfig } from "custom-card-helpers";
import type { Connection, UnsubscribeFunc } from "home-assistant-js-websocket";
import { createCollection } from "home-assistant-js-websocket";
import type { Store } from "home-assistant-js-websocket/dist/store";
import type { PropertyValues, ReactiveElement } from "lit";
import { property } from "lit/decorators.js";

export interface SubElementConfig {
  index?: number;
  type?: string;
}

export interface HassCustomElement extends CustomElementConstructor {
  getConfigElement(): Promise<unknown>;
}

export interface EditorTarget extends EventTarget {
  value?: string;
  index?: number;
  checked?: boolean;
  configValue?: string;
  type?: HTMLInputElement["type"];
  config: ActionConfig;
}

export interface Settings {
  type: string;
}

export interface RegistryEntry {
  created_at: number;
  modified_at: number;
}

export interface AreaRegistryEntry extends RegistryEntry {
  area_id: string;
  floor_id: string | null;
  name: string;
  picture: string | null;
  icon: string | null;
  labels: string[];
  aliases: string[];
}

export interface DeviceRegistryEntry extends RegistryEntry {
  id: string;
  config_entries: string[];
  connections: Array<[string, string]>;
  identifiers: Array<[string, string]>;
  manufacturer: string | null;
  model: string | null;
  model_id: string | null;
  name: string | null;
  labels: string[];
  sw_version: string | null;
  hw_version: string | null;
  serial_number: string | null;
  via_device_id: string | null;
  area_id: string | null;
  name_by_user: string | null;
  entry_type: "service" | null;
  disabled_by: "user" | "integration" | "config_entry" | null;
  configuration_url: string | null;
  primary_config_entry: string | null;
}

export interface EntityRegistryEntry extends RegistryEntry {
  id: string;
  entity_id: string;
  name: string | null;
  icon: string | null;
  platform: string;
  config_entry_id: string | null;
  device_id: string | null;
  area_id: string | null;
  labels: string[];
  disabled_by: "user" | "device" | "integration" | "config_entry" | null;
  hidden_by: Exclude<EntityRegistryEntry["disabled_by"], "config_entry">;
  has_entity_name: boolean;
  original_name?: string;
  unique_id: string;
  translation_key?: string;
  categories: { [scope: string]: string };
}

export interface HTMLElementValue extends HTMLElement {
  value: string;
}

export type Constructor<T = any> = new (...args: any[]) => T;

export const round = (value: number, precision = 2): number =>
  Math.round(value * 10 ** precision) / 10 ** precision;

export const isNumericState = (stateObj: HassEntity): boolean =>
  isNumericFromAttributes(stateObj.attributes);

export const isNumericFromAttributes = (
  attributes: HassEntityAttributeBase,
  numericDeviceClasses?: string[]
): boolean =>
  !!attributes.unit_of_measurement ||
  !!attributes.state_class ||
  (numericDeviceClasses || []).includes(attributes.device_class || "");

export enum NumberFormat {
  language = "language",
  system = "system",
  comma_decimal = "comma_decimal",
  decimal_comma = "decimal_comma",
  space_comma = "space_comma",
  none = "none",
}

export enum TimeFormat {
  language = "language",
  system = "system",
  am_pm = "12",
  twenty_four = "24",
}

export enum TimeZone {
  local = "local",
  server = "server",
}

export enum DateFormat {
  language = "language",
  system = "system",
  DMY = "DMY",
  MDY = "MDY",
  YMD = "YMD",
}

export enum FirstWeekday {
  language = "language",
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export interface FrontendLocaleData {
  language: string;
  number_format: NumberFormat;
  time_format: TimeFormat;
  date_format: DateFormat;
  first_weekday: FirstWeekday;
  time_zone: TimeZone;
}

export const blankBeforeUnit = (
  unit: string,
  localeOptions: FrontendLocaleData | undefined
): string => {
  if (unit === "°") {
    return "";
  }
  if (localeOptions && unit === "%") {
    return blankBeforePercent(localeOptions);
  }
  return " ";
};

export const blankBeforePercent = (
  localeOptions: FrontendLocaleData
): string => {
  switch (localeOptions.language) {
    case "cs":
    case "de":
    case "fi":
    case "fr":
    case "sk":
    case "sv":
      return " ";
    default:
      return "";
  }
};

const collator = memoizeOne(
  (language: string | undefined) => new Intl.Collator(language)
);

const caseInsensitiveCollator = memoizeOne(
  (language: string | undefined) =>
    new Intl.Collator(language, { sensitivity: "accent" })
);

const fallbackStringCompare = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
};

export const stringCompare = (
  a: string,
  b: string,
  language: string | undefined = undefined
) => {
  // @ts-ignore
  if (Intl?.Collator) {
    return collator(language).compare(a, b);
  }

  return fallbackStringCompare(a, b);
};

export const caseInsensitiveStringCompare = (
  a: string,
  b: string,
  language: string | undefined = undefined
) => {
  // @ts-ignore
  if (Intl?.Collator) {
    return caseInsensitiveCollator(language).compare(a, b);
  }

  return fallbackStringCompare(a.toLowerCase(), b.toLowerCase());
};

export type SensorNumericDeviceClasses = {
  numeric_device_classes: string[];
};

let sensorNumericDeviceClassesCache:
  | Promise<SensorNumericDeviceClasses>
  | undefined;

export const getSensorNumericDeviceClasses = async (
  hass: HomeAssistant
): Promise<SensorNumericDeviceClasses> => {
  if (sensorNumericDeviceClassesCache) {
    return sensorNumericDeviceClassesCache;
  }
  sensorNumericDeviceClassesCache = hass.callWS({
    type: "sensor/numeric_device_classes",
  });
  return sensorNumericDeviceClassesCache!;
};

const fetchAreaRegistry = (conn: Connection) =>
  conn
    .sendMessagePromise<AreaRegistryEntry[]>({
      type: "config/area_registry/list",
    })
    .then((areas) =>
      areas.sort((ent1, ent2) => stringCompare(ent1.name, ent2.name))
    );

const subscribeAreaRegistryUpdates = (
  conn: Connection,
  store: Store<AreaRegistryEntry[]>
) =>
  conn.subscribeEvents(
    debounce(
      () =>
        fetchAreaRegistry(conn).then((areas: AreaRegistryEntry[]) =>
          store.setState(areas, true)
        ),
      500,
      true
    ),
    "area_registry_updated"
  );

export const subscribeAreaRegistry = (
  conn: Connection,
  onChange: (areas: AreaRegistryEntry[]) => void
) =>
  createCollection<AreaRegistryEntry[]>(
    "_areaRegistry",
    fetchAreaRegistry,
    subscribeAreaRegistryUpdates,
    conn,
    onChange
  );

export const fetchDeviceRegistry = (conn: Connection) =>
  conn.sendMessagePromise<DeviceRegistryEntry[]>({
    type: "config/device_registry/list",
  });

const subscribeDeviceRegistryUpdates = (
  conn: Connection,
  store: Store<DeviceRegistryEntry[]>
) =>
  conn.subscribeEvents(
    debounce(
      () =>
        fetchDeviceRegistry(conn).then((devices) =>
          store.setState(devices, true)
        ),
      500,
      true
    ),
    "device_registry_updated"
  );

export const subscribeDeviceRegistry = (
  conn: Connection,
  onChange: (devices: DeviceRegistryEntry[]) => void
) =>
  createCollection<DeviceRegistryEntry[]>(
    "_dr",
    fetchDeviceRegistry,
    subscribeDeviceRegistryUpdates,
    conn,
    onChange
  );

export const fetchEntityRegistry = (conn: Connection) =>
  conn.sendMessagePromise<EntityRegistryEntry[]>({
    type: "config/entity_registry/list",
  });

const subscribeEntityRegistryUpdates = (
  conn: Connection,
  store: Store<EntityRegistryEntry[]>
) =>
  conn.subscribeEvents(
    debounce(
      () =>
        fetchEntityRegistry(conn).then((entities) =>
          store.setState(entities, true)
        ),
      500,
      true
    ),
    "entity_registry_updated"
  );

export const subscribeEntityRegistry = (
  conn: Connection,
  onChange: (entities: EntityRegistryEntry[]) => void
) =>
  createCollection<EntityRegistryEntry[]>(
    "_entityRegistry",
    fetchEntityRegistry,
    subscribeEntityRegistryUpdates,
    conn,
    onChange
  );

export const subscribeOne = async <T>(
  conn: Connection,
  subscribe: (
    conn2: Connection,
    onChange: (items: T) => void
  ) => UnsubscribeFunc
) =>
  new Promise<T>((resolve) => {
    const unsub = subscribe(conn, (items) => {
      unsub();
      resolve(items);
    });
  });

export interface HassSubscribeElement {
  hassSubscribe(): UnsubscribeFunc[];
}

export const SubscribeMixin = <T extends Constructor<ReactiveElement>>(
  superClass: T
) => {
  class SubscribeClass extends superClass {
    @property({ attribute: false }) public hass?: HomeAssistant;

    // we wait with subscribing till these properties are set on the host element
    protected hassSubscribeRequiredHostProps?: string[];

    private __unsubs?: Array<UnsubscribeFunc | Promise<UnsubscribeFunc>>;

    public connectedCallback() {
      super.connectedCallback();
      this._checkSubscribed();
    }

    public disconnectedCallback() {
      super.disconnectedCallback();
      if (this.__unsubs) {
        while (this.__unsubs.length) {
          const unsub = this.__unsubs.pop()!;
          if (unsub instanceof Promise) {
            unsub.then((unsubFunc) => unsubFunc());
          } else {
            unsub();
          }
        }
        this.__unsubs = undefined;
      }
    }

    protected updated(changedProps: PropertyValues) {
      super.updated(changedProps);
      if (changedProps.has("hass")) {
        this._checkSubscribed();
        return;
      }
      if (!this.hassSubscribeRequiredHostProps) {
        return;
      }
      for (const key of changedProps.keys()) {
        if (this.hassSubscribeRequiredHostProps.includes(key as string)) {
          this._checkSubscribed();
          return;
        }
      }
    }

    protected hassSubscribe(): Array<
      UnsubscribeFunc | Promise<UnsubscribeFunc>
    > {
      return [];
    }

    [key: string]: any;

    private _checkSubscribed(): void {
      if (
        this.__unsubs !== undefined ||
        !(this as unknown as Element).isConnected ||
        this.hass === undefined ||
        this.hassSubscribeRequiredHostProps?.some(
          (prop) => this[prop] === undefined
        )
      ) {
        return;
      }
      this.__unsubs = this.hassSubscribe();
    }
  }
  return SubscribeClass;
};

export function fireEvent<T>(
  node: HTMLElement | Window,
  type: string,
  detail: T
): void {
  const event = new CustomEvent(type, {
    bubbles: false,
    composed: false,
    detail: detail,
  });
  node.dispatchEvent(event);
}

