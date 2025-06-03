import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { HeatmapCardConfig, HeatmapPoint } from './types';

// Helper to make sure we have a points array
const ensurePointsArray = (config: HeatmapCardConfig): HeatmapPoint[] => {
  return config.points && Array.isArray(config.points) ? [...config.points] : [];
};

@customElement('heatmap-card-editor')
export class HeatmapCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: HeatmapCardConfig;

  public setConfig(config: HeatmapCardConfig): void {
    this._config = {
      ...config,
      points: ensurePointsArray(config), // Ensure points is an array
    };
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as any;
    let value: string | number | boolean = target.value;
    if (target.type === 'number') {
      value = Number(target.value);
    }
    if (target.configValue === 'show_legend' || target.configValue === 'show_labels' || target.configValue === 'auto_scale') {
        value = target.checked;
    }

    const newConfig = {
      ...this._config,
      [target.configValue]: value,
    };
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _pointValueChanged(ev: CustomEvent, index: number, fieldToUpdate?: string): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target as any;
    const points = ensurePointsArray(this._config);

    let configKey: string;
    let newValue: string | number | undefined;

    if (fieldToUpdate === 'entity_id') { // Specific handling for ha-entity-picker
      configKey = 'entity_id';
      newValue = ev.detail.value;
    } else {
      configKey = target.configValue;
      newValue = target.value;
      if (target.type === 'number') {
        newValue = target.value === '' ? undefined : Number(target.value);
      }
    }

    points[index] = {
      ...points[index],
      [configKey]: newValue,
    };

    // Handle entity_id vs value exclusivity
    if (configKey === 'entity_id' && newValue) {
        points[index].value = undefined;
    } else if (configKey === 'value' && newValue !== undefined) {
        points[index].entity_id = undefined;
    }

    const newConfig = { ...this._config, points };
    fireEvent(this, 'config-changed', { config: newConfig });
    // Request update to re-render if entity_id/value exclusivity changed other fields in UI
    if (configKey === 'entity_id' || configKey === 'value') {
        this.requestUpdate();
    }
  }

  private _addPoint(): void {
    if (!this._config || !this.hass) {
      return;
    }
    const points = ensurePointsArray(this._config);
    points.push({ x: 0, y: 0, label: 'New Point' }); // Basic new point
    const newConfig = { ...this._config, points };
    fireEvent(this, 'config-changed', { config: newConfig });
    this.requestUpdate(); // Ensure Lit re-renders the list
  }

  private _removePoint(index: number): void {
    if (!this._config || !this.hass) {
      return;
    }
    const points = ensurePointsArray(this._config);
    points.splice(index, 1);
    const newConfig = { ...this._config, points };
    fireEvent(this, 'config-changed', { config: newConfig });
    this.requestUpdate(); // Ensure Lit re-renders the list
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const points = ensurePointsArray(this._config);

    return html`
      <div class="card-config">
        <ha-textfield
          label="Background Image Path (Required)"
          .value="${this._config.background || ''}"
          .configValue="${'background'}"
          @input="${this._valueChanged}"
          required
          helper="e.g., /local/floorplan.png or /hacsfiles/your-card/image.jpg"
          persistent-helper
        ></ha-textfield>

        <ha-textfield
          label="Radius (pixels) (Optional)"
          type="number"
          .value="${this._config.radius || ''}"
          .configValue="${'radius'}"
          @input="${this._valueChanged}"
          min="1"
        ></ha-textfield>
        <ha-textfield
          label="Blur (pixels) (Optional)"
          type="number"
          .value="${this._config.blur || ''}"
          .configValue="${'blur'}"
          @input="${this._valueChanged}"
          min="0"
        ></ha-textfield>

        <h3>Points</h3>
        ${points.map((point, index) => {
          return html`
            <div class="point-editor">
              <h4>Point ${index + 1}</h4>
              <ha-textfield
                label="X Coordinate"
                type="number"
                required
                .value="${point.x}"
                .configValue="${'x'}"
                @input="${(e: CustomEvent) => this._pointValueChanged(e, index)}"
              ></ha-textfield>
              <ha-textfield
                label="Y Coordinate"
                type="number"
                required
                .value="${point.y}"
                .configValue="${'y'}"
                @input="${(e: CustomEvent) => this._pointValueChanged(e, index)}"
              ></ha-textfield>
              <ha-textfield
                label="Label (Optional)"
                .value="${point.label || ''}"
                .configValue="${'label'}"
                @input="${(e: CustomEvent) => this._pointValueChanged(e, index)}"
              ></ha-textfield>
              <ha-textfield
                label="Static Value (Optional - Clears Entity ID)"
                type="number"
                .value="${point.value === undefined ? '' : point.value}"
                .configValue="${'value'}"
                @input="${(e: CustomEvent) => this._pointValueChanged(e, index)}"
              ></ha-textfield>
              <ha-entity-picker
                .hass="${this.hass}"
                label="Entity ID (Optional - Clears Static Value)"
                .value="${point.entity_id || ''}"
                @value-changed="${(e: CustomEvent) => this._pointValueChanged(e, index, 'entity_id')}"
                allow-custom-entity
              ></ha-entity-picker>
               <ha-textfield
                label="Weight (0.1-2.0) (Optional)"
                type="number"
                .value="${point.weight === undefined ? '' : point.weight}"
                .configValue="${'weight'}"
                @input="${(e: CustomEvent) => this._pointValueChanged(e, index)}"
                min="0.1"
                max="2.0"
                step="0.1"
              ></ha-textfield>
              <mwc-button
                unelevated
                destructive
                @click="${() => this._removePoint(index)}"
              >
                Remove Point ${index + 1}
              </mwc-button>
            </div>
          `;
        })}
        <mwc-button outlined @click="${this._addPoint}">Add Point</mwc-button>
      </div>
    `;
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px; /* Add some space between main sections */
    }
    ha-textfield,
    ha-select,
    ha-entity-picker,
    mwc-button {
      display: block; /* Ensure they take full width available in flex column */
      margin-bottom: 8px; /* Consistent spacing for form elements */
    }
    h3 {
      margin-top: 12px;
      margin-bottom: 4px;
      font-size: 1.2em;
    }
    h4 {
      margin-top: 8px;
      margin-bottom: 2px;
      font-size: 1em;
      font-weight: bold;
    }
    .point-editor {
      border: 1px solid var(--divider-color, #ccc);
      padding: 12px;
      border-radius: var(--ha-card-border-radius, 4px);
      margin-bottom: 16px; /* Space between point editors */
    }
    mwc-button[destructive] {
      --mdc-theme-primary: var(--error-color);
    }
  `;
} 