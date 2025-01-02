import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { computeDomain, HomeAssistant, LovelaceCardEditor, LovelaceCardConfig } from "custom-card-helpers";
import memoizeOne from "memoize-one";
import { caseInsensitiveStringCompare, getSensorNumericDeviceClasses } from "./helpers";
import { DEVICE_CLASSES } from "./card";


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

  private _schema = memoizeOne((binaryClasses: SelectOption[],sensorClasses: SelectOption[]) => [
    { name: "area", selector: { area: {} } },
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
      selector: {
        select: {
          reorder: true,
          multiple: true,
          custom_value: true,
          options: binaryClasses,
        },
      },
    },
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
  ]);
  

  private _binaryClassesForArea = memoizeOne((area: string): string[] =>
    this._classesForArea(area, "binary_sensor")
  );

  private _sensorClassesForArea = memoizeOne(
    (area: string, numericDeviceClasses?: string[]): string[] =>
      this._classesForArea(area, "sensor", numericDeviceClasses)
  );

  private _classesForArea(
    area: string,
    domain: "sensor" | "binary_sensor",
    numericDeviceClasses?: string[] | undefined
  ): string[] {
    
    const entities = Object.values(this.hass!.entities).filter(
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
  
  

  private _buildBinaryOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("binary_sensor", possibleClasses, currentClasses)
  );

  private _buildSensorOptions = memoizeOne(
    (possibleClasses: string[], currentClasses: string[]): SelectOption[] =>
      this._buildOptions("sensor", possibleClasses, currentClasses)
  );

  private _buildOptions(
    domain: "sensor" | "binary_sensor",
    possibleClasses: string[],
    currentClasses: string[]
  ): SelectOption[] {
    const options = [...new Set([...possibleClasses, ...currentClasses])].map(
      (deviceClass) => ({
        value: deviceClass,
        label:
          this.hass!.localize(
            `component.${domain}.entity_component.${deviceClass}.name`
          ) || deviceClass,
      })
    );
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

  protected async updated() {
    if (this.hass && !this._numericDeviceClasses) {
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
    const binarySelectOptions = this._buildBinaryOptions(
      possibleBinaryClasses,
      this._config.alert_classes || DEVICE_CLASSES.binary_sensor
    );
    const sensorSelectOptions = this._buildSensorOptions(
      possibleSensorClasses,
      this._config.sensor_classes || DEVICE_CLASSES.sensor
    );

    const schema = this._schema(
      binarySelectOptions,
      sensorSelectOptions
    );

    const data = {
      camera_view: "auto",
      alert_classes: DEVICE_CLASSES.binary_sensor,
      sensor_classes: DEVICE_CLASSES.sensor,
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
