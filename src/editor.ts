import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { computeDomain, HomeAssistant, LovelaceCardEditor, LovelaceCardConfig } from "custom-card-helpers";
import memoizeOne from "memoize-one";
import { caseInsensitiveStringCompare, getSensorNumericDeviceClasses, HassCustomElement, SubElementConfig, Settings, fireEvent } from "./helpers";
import { DEVICE_CLASSES, TOGGLE_DOMAINS } from "./card";
import { mdiPalette } from "@mdi/js";
import './items-editor';
import './item-editor';

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

interface SubElementEditor {
  index?: number;
}

@customElement("custom-area-card-editor")
export class CustomAreaCardEditor extends LitElement implements LovelaceCardEditor {

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _numericDeviceClasses?: string[];
  @state() private _subElementEditorDomain: SubElementConfig | undefined = undefined;
  @state() private _subElementEditorAlert: SubElementConfig | undefined = undefined;
  @state() private _subElementEditorSensor: SubElementConfig | undefined = undefined;


  private _schema = memoizeOne(() => [
    { name: "area", selector: { area: {} } },
    { name: "columns", selector: { number: { min: 1, max: 4, mode: "box"} } },
    {
      name: "icon_appearance",
      flatten: true,
      type: "expandable",
      icon: "mdi:palette",
      schema: [
        { name: "area_icon", selector: { icon: {} } },
        { name: "area_icon_color", selector: { ui_color: { default_color: "state", include_state: true } } },
      ]
    },
    {
      name: "name_appearance",
      flatten: true,
      type: "expandable",
      icon: "mdi:palette",
      schema: [
        { name: "area_name", selector: { text: {} } },
        { name: "area_name_color", selector: { ui_color: { default_color: "state", include_state: true } } },
      ]
    },
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
  ]);

  private _binaryschema = memoizeOne((binaryClasses: SelectOption[]) => [
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
    { name: "alert_color", selector: { ui_color: { default_color: "state", include_state: true } } },
  ]);

  private _sensorschema = memoizeOne((sensorClasses: SelectOption[]) => [
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
    { name: "sensor_color", selector: { ui_color: { default_color: "state", include_state: true } } },
  ]);

  private _toggleschema = memoizeOne((toggleDomains: SelectOption[]) => [
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
    { name: "domain_color", selector: { ui_color: { default_color: "state", include_state: true } } },
  ]);

  protected async firstUpdated(): Promise<void> {
    if (!customElements.get('ha-form') || !customElements.get('hui-action-editor')) {
      (customElements.get('hui-button-card') as HassCustomElement)?.getConfigElement();
    }

    if (!customElements.get('ha-entity-picker')) {
      (customElements.get('hui-entities-card') as HassCustomElement)?.getConfigElement();
    }
  }

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


  setConfig(config: CardConfig): void {
    this._config = {
      ...config,
      customization_domain: config.customization_domain || [],
      customization_alert: config.customization_alert || [],
      customization_sensor: config.customization_sensor || []
    };
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


  private _editItem(
    ev: CustomEvent<number>,
    editorKey: 'Domain' | 'Alert' | 'Sensor'
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = ev.detail;

    this[`_subElementEditor${editorKey}`] = { index };
  }

  private _edit_itemDomain(ev: CustomEvent<number>): void {
    this._editItem(ev, 'Domain');
  }

  private _edit_itemAlert(ev: CustomEvent<number>): void {
    this._editItem(ev, 'Alert');
  }

  private _edit_itemSensor(ev: CustomEvent<number>): void {
    this._editItem(ev, 'Sensor');
  }


  private _customizationChanged(
    ev: CustomEvent<Settings[]>,
    customizationKey: 'domain' | 'alert' | 'sensor'
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    fireEvent(this, 'config-changed', {
      config: {
        ...this._config,
        [`customization_${customizationKey}`]: ev.detail,
      } as CardConfig,
    });
  }

  private _customizationChangedDomain(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, 'domain');
  }

  private _customizationChangedAlert(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, 'alert');
  }

  private _customizationChangedSensor(ev: CustomEvent<Settings[]>): void {
    this._customizationChanged(ev, 'sensor');
  }


  private _renderSubElementEditor(
    editorKey: 'domain' | 'alert' | 'sensor',
    goBackHandler: () => void,
    itemChangedHandler: (ev: CustomEvent<Settings>) => void
  ) {
    const editorName = `_subElementEditor${editorKey.charAt(0).toUpperCase() + editorKey.slice(1)}` as keyof this;
    const editor = this[editorName] as SubElementEditor | undefined;

    const useSensorSchema = editorKey === 'sensor';

    return html`
    <div class="header">
      <div class="back-title">
        <mwc-icon-button @click=${goBackHandler}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </mwc-icon-button>
      </div>
    </div>
    <item-editor
      .hass=${this.hass}
      .config=${this._config?.[`customization_${editorKey}`]?.[editor?.index ?? 0] ?? {}}
      .useSensorSchema=${useSensorSchema} 
      @config-changed=${itemChangedHandler}
    >
    </item-editor>
  `;
  }

  private _renderSubElementEditorDomain() {
    return this._renderSubElementEditor('domain', this._goBackDomain, this._itemChangedDomain);
  }

  private _renderSubElementEditorAlert() {
    return this._renderSubElementEditor('alert', this._goBackAlert, this._itemChangedAlert);
  }

  private _renderSubElementEditorSensor() {
    return this._renderSubElementEditor(
      'sensor',
      this._goBackSensor,
      this._itemChangedSensor
    );
  }

  private _goBackDomain(): void {
    this._subElementEditorDomain = undefined;
  }

  private _goBackAlert(): void {
    this._subElementEditorAlert = undefined;
  }

  private _goBackSensor(): void {
    this._subElementEditorSensor = undefined;
  }


  private _itemChanged(
    ev: CustomEvent<Settings>,
    editorTarget: { index?: number } | undefined,
    customizationKey: 'customization_domain' | 'customization_alert' | 'customization_sensor'
  ): void {
    ev.stopPropagation();
    if (!this._config || !this.hass) {
      return;
    }
    const index = editorTarget?.index;
    if (index != undefined) {
      const customization = [...this._config[customizationKey]];
      customization[index] = ev.detail;
      fireEvent(this, 'config-changed', { config: { ...this._config, [customizationKey]: customization } });
    }
  }

  private _itemChangedDomain(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorDomain, 'customization_domain');
  }

  private _itemChangedAlert(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorAlert, 'customization_alert');
  }

  private _itemChangedSensor(ev: CustomEvent<Settings>): void {
    this._itemChanged(ev, this._subElementEditorSensor, 'customization_sensor');
  }


  public get toggleSelectOptions(): SelectOption[] {
    return this._buildToggleOptions(
      this._toggleDomainsForArea(this._config!.area || ""),
      this._config?.toggle_domains || this._toggleDomainsForArea(this._config!.area || "")
    );
  }

  public get binarySelectOptions(): SelectOption[] {
    return this._buildBinaryOptions(
      this._binaryClassesForArea(this._config!.area || ""),
      this._config?.alert_classes || this._binaryClassesForArea(this._config!.area || "")
    );
  }

  public get sensorSelectOptions(): SelectOption[] {
    return this._buildSensorOptions(
      this._sensorClassesForArea(this._config!.area || ""),
      this._config?.sensor_classes || this._sensorClassesForArea(this._config!.area || "")
    );
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const possibleToggleDomains = this._toggleDomainsForArea(
      this._config.area || ""
    );

    const schema = this._schema();

    const binaryschema = this._binaryschema(
      this.binarySelectOptions
    );

    const sensorschema = this._sensorschema(
      this.sensorSelectOptions
    );

    const toggleschema = this._toggleschema(
      this.toggleSelectOptions
    );

    const data = {
      alert_classes: DEVICE_CLASSES.binary_sensor,
      sensor_classes: DEVICE_CLASSES.sensor,
      toggle_domains: possibleToggleDomains,
      ...this._config,
    };

    if (this._subElementEditorDomain) return this._renderSubElementEditorDomain();
    if (this._subElementEditorAlert) return this._renderSubElementEditorAlert();
    if (this._subElementEditorSensor) return this._renderSubElementEditorSensor();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${mdiPalette}></ha-svg-icon>
          ${this._computeLabelCallback({ name: "alert_classes" })}
        </div>
        <div class="content">
          <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${binaryschema}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          ></ha-form>
          <alert-items-editor
            .hass=${this.hass}
            .customization_alert=${this._config.customization_alert}
            .SelectOptions=${this.binarySelectOptions}
            @edit-item=${this._edit_itemAlert}
            @config-changed=${this._customizationChangedAlert}>
          </alert-items-editor>          
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${mdiPalette}></ha-svg-icon>
          ${this._computeLabelCallback({ name: "sensor_classes" })}
        </div>
        <div class="content">
          <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${sensorschema}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          ></ha-form>
          <sensor-items-editor
            .hass=${this.hass}
            .customization_sensor=${this._config.customization_sensor}
            .SelectOptions=${this.sensorSelectOptions}
            @edit-item=${this._edit_itemSensor}
            @config-changed=${this._customizationChangedSensor}>
          </sensor-items-editor>
        </div>
      </ha-expansion-panel>

      <ha-expansion-panel outlined class="main" .name="toggle_domains">
        <div slot="header" role="heading" aria-level="3">
          <ha-svg-icon .path=${mdiPalette}></ha-svg-icon>
            ${this._computeLabelCallback({ name: "toggle_domains" })}
        </div>
        <div class="content">
          <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${toggleschema}
          .computeLabel=${this._computeLabelCallback}
          @value-changed=${this._valueChanged}
          ></ha-form>
          <domain-items-editor
            .hass=${this.hass}
            .customization_domain=${this._config.customization_domain}
            .SelectOptions=${this.toggleSelectOptions}
            @edit-item=${this._edit_itemDomain}
            @config-changed=${this._customizationChangedDomain}>
          </domain-items-editor>
        </div>
      </ha-expansion-panel>        
    `;
  }

  static styles = css`
  :host {
    display: block;
  }
  select {
    padding: 5px;
    font-size: 14px;
  } 
  ha-svg-icon {
    color: var(--secondary-text-color);
  }
  .main {
    --ha-card-border-radius: 6px;
    border-radius: 6px;
    margin-top: 24px;
  }   
  ha-svg-icon {
    color: var(--secondary-text-color);
  }
`;

}

