import { html, css, TemplateResult } from "lit";
import { HassEntity } from "home-assistant-js-websocket";


export const renderPopup = (
  hass: any,
  config: any,
  entitiesByArea: Record<string, HassEntity[]>,
  areaName: string,
  columns: number,
  closeDialog: () => void,
  createCard: (config: { type: string; entity: string; [key: string]: any }) => TemplateResult,
  getDomainName: (domain: string) => string
): TemplateResult => {
  return html`
    <ha-dialog id="more-info-dialog" style="--columns: ${columns};" open @closed="${closeDialog}">
      <div class="dialog-header">
        <ha-icon-button
          slot="navigationIcon"
          dialogaction="cancel"
          @click=${closeDialog}
          title="Close"
        >
          <ha-icon class="center" icon="mdi:close"></ha-icon>
        </ha-icon-button>
        <h3>
          Bereich: ${config.area_name || areaName}
        </h3>
      </div>
      <div class="tile-container">
        ${Object.entries(entitiesByArea).map(([domain, entities]) => html`
          <div class="domain-group">
            <h4>${getDomainName(domain)}</h4>
            <div class="domain-entities">
              ${entities.map((entity: HassEntity) => html`
                <div class="entity-card">
                  ${createCard({
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
};

export const popupStyles = css`
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
