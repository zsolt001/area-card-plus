import { LitElement, TemplateResult, html, css, CSSResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { HomeAssistant } from 'custom-card-helpers';

import { EntitySettings,} from './helpers';

import { CardConfig } from './editor'

import memoizeOne from "memoize-one";



@customElement('distribution-card-item-editor')
export class ItemEditor extends LitElement {
  @property({ attribute: false }) config?: EntitySettings;

  @property({ attribute: false }) hass?: HomeAssistant;

  @state() private _config?: CardConfig;

  private _schema = memoizeOne(() => [
    { name: "color", selector: { ui_color: {default_color: "state", include_state: true} } },
    { name: "icon", selector: { icon: {} } },
  ]);


  protected render(): TemplateResult {
    // If its a placeholder, don't render anything
    if (!this.hass || !this.config ) {
      return html``;
    }
    const item = this.config;

    // Attributes for the selection drop down panel
    // TODO!: Why destructure the object
    let attributes: string[] = [];
    if (item.entity) {
      attributes = Object.keys({ ...this.hass?.states[item.entity || 0].attributes }) || [];
    }

    let secondary_info_attributes: string[] = [];
    if (item.secondary_info_entity) {
      secondary_info_attributes = Object.keys({ ...this.hass?.states[item.secondary_info_entity].attributes }) || [];
    }

        const schema = this._schema();
    
        const data = {
          ...this._config,
        };
    

    return html`

      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        @value-changed=${this._valueChangedSchema}
      ></ha-form>

    `;
  }



  private _valueChangedSchema(event: CustomEvent): void {
    if (!this.config) {
      return;
    }
  
    // Kombiniere die bestehenden Werte mit den neuen Werten aus dem Formular
    const updatedConfig = {
      ...this.config,         // Bestehende Werte beibehalten
      ...event.detail.value,  // Neue Werte hinzufügen oder überschreiben
    };
  
    // Speichere die aktualisierte Konfiguration
    this._config = updatedConfig;
  
    // Dispatch das Event mit der aktualisierten Konfiguration
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail:  updatedConfig,
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