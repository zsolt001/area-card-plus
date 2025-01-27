import { LitElement, TemplateResult, html, css, CSSResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { Settings } from "./helpers";
import { CardConfig } from "./editor";
import memoizeOne from "memoize-one";

interface Schema {
  name: string;
  selector?: any;
  required?: boolean;

  default?: any;
  type?: string;
}

@customElement("item-editor")
export class ItemEditor extends LitElement {
  @property({ attribute: false }) config?: Settings;
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) useSensorSchema: boolean = false;
  @state() private getSchema?: string;
  @state() private _config?: CardConfig;

  private _schemadomain = memoizeOne(() => [
    {
      name: "tap_action",
      selector: {
        select: {
          options: [
            { label: "None", value: "none" },
            { label: "Toggle", value: "toggle" },
            { label: "Popup", value: "popup" },
          ],
        },
      },
    },
    {
      name: "color",
      selector: { ui_color: { default_color: "state", include_state: true } },
    },
    { name: "icon", selector: { icon: {} } },
  ]);

  private _schemaalert = memoizeOne(() => [
    {
      name: "tap_action",
      selector: {
        select: {
          options: [
            { label: "None", value: "none" },
            { label: "Popup", value: "popup" },
          ],
        },
      },
    },
    {
      name: "color",
      selector: { ui_color: { default_color: "state", include_state: true } },
    },
    { name: "icon", selector: { icon: {} } },
  ]);

  private _schemasensor = memoizeOne(() => [
    {
      name: "tap_action",
      selector: {
        select: {
          options: [
            { label: "None", value: "none" },
            { label: "Popup", value: "popup" },
          ],
        },
      },
    },
    {
      name: "color",
      selector: { ui_color: { default_color: "state", include_state: true } },
    },
  ]);

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    let schema;
    switch (this.getSchema) {
      case "sensor":
        schema = this._schemasensor();
        break;
      case "domain":
        schema = this._schemadomain();
        break;
      case "alert":
        schema = this._schemaalert();
        break;
    }

    const data = {
      ...this._config,
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabelCallback}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>
    `;
  }

  private _computeLabelCallback = (schema: Schema): string => {
    switch (schema.name) {
      case "icon":
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.generic.icon`
        );
      case "color":
        return this.hass!.localize(`ui.panel.lovelace.editor.card.tile.color`);
      case "enable_popup_view":
        return (
          this.hass!.localize("ui.common.enable") +
          " " +
          this.hass!.localize(
            "ui.panel.lovelace.editor.action-editor.actions.more-info"
          )
        );
      case "disable_toggle_action":
        return (
          this.hass!.localize("ui.common.disable") +
          " " +
          this.hass!.localize(
            "ui.panel.lovelace.editor.card.generic.tap_action"
          )
        );
      case "tap_action":
        return this.hass!.localize(
          "ui.panel.lovelace.editor.card.generic.tap_action"
        );
      default:
        return this.hass!.localize(
          `ui.panel.lovelace.editor.card.area.${schema.name}`
        );
    }
  };

  private _valueChangedSchema(event: CustomEvent): void {
    if (!this.config) {
      return;
    }

    const updatedConfig = {
      ...this.config,
      ...event.detail.value,
    };

    this._config = updatedConfig;

    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: updatedConfig,
      })
    );
  }

  static get styles(): CSSResult {
    return css`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
    `;
  }
}
