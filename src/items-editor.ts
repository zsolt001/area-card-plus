import { LitElement, html } from 'lit';

import { HomeAssistant } from 'custom-card-helpers';
import { EditorTarget, EntitySettings, HTMLElementValue } from './helpers';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { css, CSSResult, nothing } from 'lit';
import { mdiClose, mdiPencil, mdiPlusCircleOutline } from '@mdi/js';
import { PresetList, PresetObject } from './helpers';
import { fireEvent } from './helpers';
import { SelectOption } from './editor';


@customElement('distribution-card-items-editor')
export class ItemsEditor extends LitElement {
  @property({ attribute: false }) customization?: EntitySettings[];

  @property({ attribute: false }) hass?: HomeAssistant;

  @property({ type: Array }) toggleSelectOptions: SelectOption[] = [];


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
            <div class="customize-item">

              <ha-select
                label="Customize"
                name="Customize"
                class="select-customization"
                naturalMenuWidth
                fixedMenuPosition
                .value=${conf.domain}
                @closed=${(ev: any) => ev.stopPropagation()}
                @value-changed=${this._valueChanged}
              >
               ${this.toggleSelectOptions.map((option) =>html`<mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`)}

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
          label="Customize"
          name="Customize"
          class="add-customization"
          naturalMenuWidth
          fixedMenuPosition
          @closed=${(ev: any) => ev.stopPropagation()}
          @click=${this._addRow}
        >
        ${this.toggleSelectOptions.map((option) =>html`<mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`)}
        </ha-select>

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

    const selectElement = this.shadowRoot!.querySelector('.add-customization') as HTMLElementValue;
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
      .customize-item,
      .add-item {
        display: flex;
        align-items: center;
      }
      .customize-item {
        display: flex;
        align-items: center;
      }
      .customize-item .handle {
        padding-right: 8px;
        cursor: move;
        padding-inline-end: 8px;
        padding-inline-start: initial;
        direction: var(--direction);
      }
      .customize-item .handle > * {
        pointer-events: none;
      }
      .customize-item ha-entity-picker,
      .add-item ha-entity-picker {
        flex-grow: 1;
      }
      .customization {
        margin-bottom: 8px;
      }
      .add-customization, .select-customization {
        padding-right: 8px;
        width: 100%;
        margin-top: 8px;
      }
      .add-customization {
        padding-right: 0px;
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