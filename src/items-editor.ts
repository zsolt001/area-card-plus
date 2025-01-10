import { LitElement, html } from 'lit';

import { HomeAssistant } from 'custom-card-helpers';
import { EditorTarget, EntitySettings, HTMLElementValue } from './helpers';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { css, CSSResult, nothing } from 'lit';
import { mdiClose, mdiPencil, mdiPlusCircleOutline } from '@mdi/js';
import { PresetList, PresetObject } from './helpers';
import { fireEvent } from './helpers';


@customElement('distribution-card-items-editor')
export class ItemsEditor extends LitElement {
  @property({ attribute: false }) customization?: EntitySettings[];

  @property({ attribute: false }) hass?: HomeAssistant;

  private _entityKeys = new WeakMap<EntitySettings, string>();

  private _getKey(action: EntitySettings) {
    if (!this._entityKeys.has(action)) {
      this._entityKeys.set(action, Math.random().toString());
    }

    return this._entityKeys.get(action)!;
  }

  protected render() {
    if (!this.hass) {
      return nothing;
    }

    return html`
      <h3>Editor</h3>
      <div class="customization">
        ${this.customization &&
        repeat(
          this.customization,
          (conf) => this._getKey(conf),
          (conf, index) => html`
            <div class="entity">
              <div class="handle">
                <ha-icon icon="mdi:drag"></ha-icon>
              </div>

              <ha-select
                label="Preset"
                name="preset"
                class="select-preset"
                naturalMenuWidth
                fixedMenuPosition
                .value=${conf.domain}
                @closed=${(ev: any) => ev.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
                ${PresetList.map((val) => html`<mwc-list-item .value=${val}>${val}</mwc-list-item>`)}
              </ha-select>

              <ha-icon-button
                .label="Remove"
                .path=${mdiClose}
                class="remove-icon"
                .index=${index}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label="Edit"
                .path=${mdiPencil}
                class="edit-icon"
                .index=${index}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `
        )}
      </div>

      <div class="add-item row">
        <ha-select
          label="Preset"
          name="preset"
          class="add-preset"
          naturalMenuWidth
          fixedMenuPosition
          @closed=${(ev: any) => ev.stopPropagation()}
        >
          ${PresetList.map((val) => html`<mwc-list-item .value=${val}>${val}</mwc-list-item>`)}
        </ha-select>

        <ha-icon-button
          .label="Add"
          .path=${mdiPlusCircleOutline}
          class="add-icon"
          @click="${this._addRow}"
        ></ha-icon-button>
      </div>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this.customization || !this.hass) {
      return;
    }
    const value = ev.detail.value;
    const index = (ev.target as any).index;
    const newCustomization = this.customization.concat();

    newCustomization[index] = {
      ...newCustomization[index],
      entity: value || '',
    };

    fireEvent(this, 'config-changed', newCustomization);
  }

  private _removeRow(ev: Event): void {
    ev.stopPropagation();
    const index = (ev.currentTarget as EditorTarget).index;
    if (index != undefined) {
      const customization = this.customization!.concat();
      customization.splice(index, 1);
      fireEvent<EntitySettings[]>(this, 'config-changed', customization);
    }
  }

  private _editRow(ev: Event): void {
    ev.stopPropagation();

    const index = (ev.target as EditorTarget).index;
    if (index != undefined) {
      fireEvent<number>(this, 'edit-item', index);
    }
  }

  private _addRow(ev: Event): void {
    ev.stopPropagation();
    if (!this.customization || !this.hass) {
      return;
    }

    const selectElement = this.shadowRoot!.querySelector('.add-preset') as HTMLElementValue;
    if (!selectElement || !selectElement.value) {
      return;
    }

    const preset = selectElement.value;

    const newItem = Object.assign({}, PresetObject[preset], {
      domain: preset,
    });

    fireEvent<EntitySettings[]>(this, 'config-changed', [...this.customization, newItem]);

    selectElement.value = '';
  }

  


  static get styles(): CSSResult {
    return css`
      #sortable a:nth-of-type(2n) paper-icon-item {
        animation-name: keyframes1;
        animation-iteration-count: infinite;
        transform-origin: 50% 10%;
        animation-delay: -0.75s;
        animation-duration: 0.25s;
      }
      #sortable a:nth-of-type(2n-1) paper-icon-item {
        animation-name: keyframes2;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        transform-origin: 30% 5%;
        animation-delay: -0.5s;
        animation-duration: 0.33s;
      }
      #sortable a {
        height: 48px;
        display: flex;
      }
      #sortable {
        outline: none;
        display: block !important;
      }
      .hidden-panel {
        display: flex !important;
      }
      .sortable-fallback {
        display: none;
      }
      .sortable-ghost {
        opacity: 0.4;
      }
      .sortable-fallback {
        opacity: 0;
      }
      @keyframes keyframes1 {
        0% {
          transform: rotate(-1deg);
          animation-timing-function: ease-in;
        }
        50% {
          transform: rotate(1.5deg);
          animation-timing-function: ease-out;
        }
      }
      @keyframes keyframes2 {
        0% {
          transform: rotate(1deg);
          animation-timing-function: ease-in;
        }
        50% {
          transform: rotate(-1.5deg);
          animation-timing-function: ease-out;
        }
      }
      .show-panel,
      .hide-panel {
        display: none;
        position: absolute;
        top: 0;
        right: 4px;
        --mdc-icon-button-size: 40px;
      }
      :host([rtl]) .show-panel {
        right: initial;
        left: 4px;
      }
      .hide-panel {
        top: 4px;
        right: 8px;
      }
      :host([rtl]) .hide-panel {
        right: initial;
        left: 8px;
      }
      :host([expanded]) .hide-panel {
        display: block;
      }
      :host([expanded]) .show-panel {
        display: inline-flex;
      }
      paper-icon-item.hidden-panel,
      paper-icon-item.hidden-panel span,
      paper-icon-item.hidden-panel ha-icon[slot='item-icon'] {
        color: var(--secondary-text-color);
        cursor: pointer;
      }
      .entity,
      .add-item {
        display: flex;
        align-items: center;
      }
      .entity {
        display: flex;
        align-items: center;
      }
      .entity .handle {
        padding-right: 8px;
        cursor: move;
        padding-inline-end: 8px;
        padding-inline-start: initial;
        direction: var(--direction);
      }
      .entity .handle > * {
        pointer-events: none;
      }
      .entity ha-entity-picker,
      .add-item ha-entity-picker {
        flex-grow: 1;
      }
      .entities {
        margin-bottom: 8px;
      }
      .add-preset, .select-preset {
        padding-right: 8px;
        width: 100%;
      }
      .remove-icon,
      .edit-icon,
      .add-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
      }
    `;
  }
}