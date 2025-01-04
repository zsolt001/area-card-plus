import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { computeDomain, HomeAssistant, LovelaceCardEditor, LovelaceCardConfig } from "custom-card-helpers";
import memoizeOne from "memoize-one";
import { caseInsensitiveStringCompare, getSensorNumericDeviceClasses } from "./helpers";
import { DEVICE_CLASSES, TOGGLE_DOMAINS } from "./card";


export interface CardConfig extends LovelaceCardConfig {
  area: string;
  navigation_path?: string;
}

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
}

  interface Schema {
    name: string;
    selector?: any;
    required?: boolean;

    default?: any;
    type?: string;
  }
  

@customElement("custom-area-card-editor")
export class CustomAreaCardEditor extends LitElement  implements LovelaceCardEditor {

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: CardConfig;

  @state() private _numericDeviceClasses?: string[];

  private _schema = memoizeOne((binaryClasses: SelectOption[],sensorClasses: SelectOption[], toggleDomains: SelectOption[]) => [
    { name: "area", selector: { area: {} } },
    {
      name: "icon_appearance",
      flatten: true,
      type: "expandable",
      icon: "mdi:palette",
      schema: [
        { name: "area_icon", selector: { icon: {} } },
        { name: "area_icon_color", selector: { ui_color: {default_color: "state", include_state: true} } },
      ]},
      {
        name: "name_appearance",
        flatten: true,
        type: "expandable",
        icon: "mdi:palette",
        schema: [
          { name: "area_name", selector: { text: {} } },
          { name: "area_name_color", selector: { ui_color: {default_color: "state", include_state: true} } },
        ]},      
    {
      name: "",
      type: "grid",
      schema: [
        {
          name: "navigation_path",
          required: false,
          selector: { navigation: {} },
        },
        { name: "theme", required: false, selector: { theme: {} } },
      ],
    },
    {
      name: "alert_classes",
      flatten: true,
      type: "expandable",
      icon: "mdi:palette",
      schema: [
        {
          name: "alert_classes",
          selector: {
            select: {
              reorder: true,
              multiple: true,
              custom_value: true,
              options: binaryClasses,
            },
          },
        },
        { name: "alert_color", selector: { ui_color: {default_color: "state", include_state: true} } },
      ]},    
      {
        name: "sensor_classes",
        flatten: true,
        type: "expandable",
        icon: "mdi:palette",
        schema: [
          {
            name: "sensor_classes",
            selector: {
              select: {
                reorder: true,
                multiple: true,
                custom_value: true,
                options: sensorClasses,
              },
            },
          },
          { name: "sensor_color", selector: { ui_color: {default_color: "state", include_state: true} } },
        ]},       
        {
          name: "toggle_domains",
          flatten: true,
          type: "expandable",
          icon: "mdi:palette",
          schema: [
            { name: "show_active", selector: { boolean: {} } },
            {
              name: "toggle_domains",
              selector: {
                select: {
                  reorder: true,
                  multiple: true,
                  custom_value: true,
                  options: toggleDomains,
                },
              },
            },
            { name: "toggle_color", selector: { ui_color: {default_color: "state", include_state: true} } },
            
          ]},   
  ]);
  

  private _binaryClassesForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "binary_sensor")
  );

  private _sensorClassesForArea = memoizeOne(
    (area: string, numericDeviceClasses?: string[]): string[] =>
      this._classesForArea(area, "sensor", numericDeviceClasses)
  );

  private _toggleDomainsForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "toggle")
  );

  private _classesForArea(
    area: string,
    domain: "sensor" | "binary_sensor" | "toggle",
    numericDeviceClasses?: string[] | undefined
  ): string[] {
    let entities;
  
    if (domain === "toggle") {
      entities = Object.values(this.hass!.entities).filter(
        (e) =>
          TOGGLE_DOMAINS.includes(computeDomain(e.entity_id)) &&
          !e.hidden &&
          (e.area_id === area ||
            (e.device_id && this.hass!.devices[e.device_id]?.area_id === area))
      );
  
      return [...new Set(entities.map((e) => computeDomain(e.entity_id)))];
      
    } else {
      entities = Object.values(this.hass!.entities).filter(
        (e) =>
          computeDomain(e.entity_id) === domain &&
          !e.entity_category &&
          !e.hidden &&
          (e.area_id === area ||
            (e.device_id && this.hass!.devices[e.device_id]?.area_id === area))
      );
  
      const classes = entities
        .map((e) => this.hass!.states[e.entity_id]?.attributes.device_class || "")
        .filter(
          (c) =>
            c &&
            (domain !== "sensor" ||
              !numericDeviceClasses ||
              numericDeviceClasses.includes(c))
        );
  
      return [...new Set(classes)];
    }
  }

  private _buildBinaryOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("binary_sensor", possibleClasses, currentClasses)
  );

  private _buildSensorOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("sensor", possibleClasses, currentClasses)
  );

  private _buildToggleOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("toggle", possibleClasses, currentClasses)
  );

  private _buildOptions(
    domain: "sensor" | "binary_sensor" | "toggle",
    possibleClasses: string[],
    currentClasses: string[]
  ): SelectOption[] {
    let allClasses: string[];
  
    if (domain === "toggle") {
      // Für Toggle-Domains nutzen wir direkt die möglichen und aktuellen Domains
      allClasses = [...new Set([...possibleClasses, ...currentClasses])];
    } else {
      allClasses = [...new Set([...possibleClasses, ...currentClasses])];
    }
  
    const options = allClasses.map((deviceClass) => ({
      value: deviceClass,
      label:
        domain === "toggle"
          ? this.hass!.localize(
              `component.${deviceClass}.entity_component._.name`
            ) || deviceClass
          : this.hass!.localize(
              `component.${domain}.entity_component.${deviceClass}.name`
            ) || deviceClass,
    }));
  
    options.sort((a, b) =>
      caseInsensitiveStringCompare(a.label, b.label, this.hass!.locale.language)
    );
  
    return options;
  }
  
  



  static styles = css`
    :host {
      display: block;
    }
    select {
      padding: 5px;
      font-size: 14px;
    }
  `;

  setConfig(config: CardConfig): void {
    this._config = config;

  }

  protected async updated(changedProperties: Map<string | number | symbol, unknown>): Promise<void> {
    super.updated(changedProperties);
  
    if (!this.hass || !this._config) {
      return;
    }
  
    if (changedProperties.has("_config")) {
      const previousConfig = changedProperties.get("_config") as CardConfig | undefined;
      const previousArea = previousConfig?.area;
      const currentArea = this._config.area;
  
      if (previousArea !== currentArea && previousArea !== undefined) {
  
        const possibleToggleDomains = this._toggleDomainsForArea(currentArea);
  
        const sortedToggleDomains = possibleToggleDomains.sort(
          (a, b) => TOGGLE_DOMAINS.indexOf(a) - TOGGLE_DOMAINS.indexOf(b)
        );
  
        this._config.toggle_domains = [...sortedToggleDomains];
  
        this.requestUpdate();
      }
    }
  
    if (!this._numericDeviceClasses) {
      const { numeric_device_classes: sensorNumericDeviceClasses } =
        await getSensorNumericDeviceClasses(this.hass);
      this._numericDeviceClasses = sensorNumericDeviceClasses;
    }
  }

  private _valueChanged(event: CustomEvent) {
    this._config = event.detail.value;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
      })
    );
  }
  

  private _computeLabelCallback = (schema: Schema): string => {
    switch (schema.name) {
      case "theme":
        return `${this.hass!.localize(
          "ui.panel.lovelace.editor.card.generic.theme"
        )} (${this.hass!.localize(
          "ui.panel.lovelace.editor.card.config.optional"
        )})`;
      case "area":
        return this.hass!.localize("ui.panel.lovelace.editor.card.area.name");
      case "navigation_path":
        return this.hass!.localize(
          "ui.panel.lovelace.editor.action-editor.navigation_path"
        );
      case "aspect_ratio":
        return this.hass!.localize(
          "ui.panel.lovelace.editor.card.generic.aspect_ratio"
        );
        case "area_name":
          return this.hass!.localize(
            `ui.panel.lovelace.editor.card.generic.name`
            );         
        case "area_icon":   
        return this.hass!.localize(
              `ui.panel.lovelace.editor.card.generic.icon`
              );     
       case "icon_appearance":
        return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.icon`) + " " + this.hass!.localize(`ui.panel.lovelace.editor.card.tile.appearance`);     
          case "name_appearance":
            return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.name`) + " " + this.hass!.localize(`ui.panel.lovelace.editor.card.tile.appearance`); 
      case "toggle_domains":
        return this.hass!.localize(`ui.panel.lovelace.editor.cardpicker.domain`);       
      case "show_active":
        return this.hass!.localize(`ui.common.hide`) + " " + this.hass!.localize(`ui.components.entity.entity-state-picker.state`) + " " + this.hass!.localize(`component.binary_sensor.entity_component._.state.off`);                          
      case "color":
      case "icon_tap_action":
      case "show_entity_picture":
      case "vertical":
      case "hide_state":
      case "state_content":
      case "appearance":
      case "interactions":
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.tile.${schema.name}`
        );  
      default:
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.area.${schema.name}`
        );
    }
  };
  


  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const possibleBinaryClasses = this._binaryClassesForArea(
      this._config.area || ""
    );
    const possibleSensorClasses = this._sensorClassesForArea(
      this._config.area || "",
      this._numericDeviceClasses
    );
    const possibleToggleDomains = this._toggleDomainsForArea(
      this._config.area || ""
    );
    const binarySelectOptions = this._buildBinaryOptions(
      possibleBinaryClasses,
      this._config.alert_classes || DEVICE_CLASSES.binary_sensor
    );
    const sensorSelectOptions = this._buildSensorOptions(
      possibleSensorClasses,
      this._config.sensor_classes || DEVICE_CLASSES.sensor
    );
    const toggleSelectOptions = this._buildToggleOptions(
      possibleToggleDomains,
      this._config.toggle_domains || possibleToggleDomains
    );
    const schema = this._schema(
      binarySelectOptions,
      sensorSelectOptions,
      toggleSelectOptions
    );

    const data = {
      alert_classes: DEVICE_CLASSES.binary_sensor,
      sensor_classes: DEVICE_CLASSES.sensor,
      toggle_domains: possibleToggleDomains,
      ...this._config,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  
}
