import { LitElement, html, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
// import h337 from 'heatmap.js'; // REMOVE heatmap.js
import simpleheat from 'simpleheat'; // ADD simpleheat
import { HeatmapCardConfig, HeatmapPoint } from './types';
import { ConfigValidator } from './config-validator';

// Define a new type for simpleheat data points if needed, or use [number, number, number][] directly
type SimpleHeatPoint = [number, number, number]; // [x, y, value]

// console.log('heatmap-card.js module execution started!');
// console.log('h337 imported:', typeof h337, h337); // REMOVE
// console.log('h337.create:', typeof h337.create); // REMOVE
console.log('simpleheat imported:', typeof simpleheat);

// Remove CustomCardEntry interface and use the exact declaration from types.ts
declare global {
    interface Window {
        customCards?: Array<{
            type: string;
            name: string;
            preview?: boolean;
            description?: string;
        }>;
    }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'heatmap-card',
  name: 'Heatmap Card',
  preview: true, 
  description: 'A custom card for displaying heatmaps on background images'
});

@customElement('heatmap-card')
export class HeatmapCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: HeatmapCardConfig;
  @state() private _error: string | null = null;
  @state() private _loading = true;
  @state() private _imageLoaded = false;
  @state() private _currentValues: Map<string, number> = new Map();
  
  private _heatmapInstance: any | null = null; // Use any for simpleheat instance type for now
  private _container: HTMLElement | null = null;
  private _updateInterval: number | null = null;
  private _resizeObserver: ResizeObserver | null = null;
  private _entities: Set<string> = new Set();
  private _canvasElement: HTMLCanvasElement | null = null; // Explicit reference to the canvas

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    // Dynamically import the editor class
    await import('./heatmap-card-editor');
    const element = document.createElement('heatmap-card-editor');
    return element as unknown as LovelaceCardEditor;
  }

  public static getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]): HeatmapCardConfig {
    // console.log('HeatmapCard getStubConfig called internally or by editor');
    const defaultConfig = ConfigValidator.getDefaultConfig();
    const exampleEntities = entitiesFallback || ['sensor.example_temperature', 'sensor.another_example'];
    const randomEntity = () => exampleEntities[Math.floor(Math.random() * exampleEntities.length)];

    return {
      type: 'custom:heatmap-card',
      background: '/local/floorplan.png', // Generic placeholder
      points: [
        {
          x: 100,
          y: 150,
          entity_id: entities && entities.length > 0 ? entities[0] : randomEntity(),
          label: 'Living Room (Example)',
          weight: 1.0
        },
        {
          x: 200,
          y: 50,
          value: 65,
          label: 'Kitchen (Static Example)',
          weight: 0.8,
        },
      ],
      radius: defaultConfig.radius,
      blur: defaultConfig.blur,
      opacity: defaultConfig.opacity,
      auto_scale: defaultConfig.auto_scale,
      scale_margin: defaultConfig.scale_margin,
      update_interval: defaultConfig.update_interval,
      show_legend: defaultConfig.show_legend,
      legend_unit: defaultConfig.legend_unit,
      show_labels: defaultConfig.show_labels,
      gradient: defaultConfig.gradient,
      error_message: 'Error loading heatmap data.', // Default error message
    } as HeatmapCardConfig; // Type assertion
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
        position: relative;
        line-height: 0; /* Attempt to fix extra space */
      }

      .card-container {
        position: relative;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 4px);
        background: var(--ha-card-background, var(--card-background-color, white));
        line-height: 0; /* Attempt to fix extra space */
      }

      .heatmap-wrapper {
        position: relative;
        display: block; /* Changed from inline-block to prevent extra space */
        line-height: 0; /* Remove line-height spacing */
        overflow: hidden; /* Prevent any internal overflow from adding space */
      }

      .background-image {
        display: block; /* Default state, will be made visible on load */
        max-width: 100%;
        height: auto;
        vertical-align: top;
        opacity: 0; /* Hidden until loaded */
        transition: opacity 0.3s ease-in-out;
      }

      .background-image.loaded {
        opacity: 1;
      }

      #heatmap-canvas-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5; /* Ensure it's above the image but below labels/legend */
        pointer-events: none; /* Allow mouse events to pass through for tooltips */
      }

      #heatmap-canvas-container canvas {
        position: absolute;
        top: 0;
        left: 0;
      }

      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);
        color: var(--primary-text-color);
        z-index: 10; /* Ensure it's above the (initially invisible) image */
      }

      .loading-overlay.hidden {
        display: none;
      }

      .heatmap-canvas {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
      }
      
      .error-container {
        padding: 16px;
        background-color: var(--error-background-color, #fdecea);
        border-radius: var(--ha-card-border-radius, 4px);
      }

      .error-title {
        font-weight: bold;
        color: var(--error-color, var(--primary-text-color));
        margin-bottom: 8px;
        font-size: 1.2em;
      }
      
      .error-message {
        color: var(--error-color, var(--primary-text-color));
        white-space: pre-wrap;
      }

      .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 150px;
        padding: 16px;
        color: var(--primary-text-color);
      }
      .loading p {
        margin-top: 10px;
      }

      .legend {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
        font-size: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 6; /* Reduced z-index */
        display: flex;
        align-items: flex-end;
      }

      .legend-gradient {
        width: 20px;
        height: 100px;
        border: 1px solid #ccc;
      }

      .legend-labels {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        height: 100px;
        justify-content: space-between;
        text-align: left;
        width: auto;
      }

      .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 10; /* Reduced z-index */
        opacity: 0;
        transition: opacity 0.2s;
        white-space: nowrap;
      }

      .tooltip.visible {
        opacity: 1;
      }

      .point-label {
        position: absolute;
        font-size: 11px;
        color: var(--primary-text-color);
        background: transparent;
        padding: 2px 4px;
        border-radius: 2px;
        pointer-events: none;
        transform: translate(-50%, -150%);
        white-space: nowrap;
        z-index: 7; /* Reduced z-index */
      }
    `;
  }

  public setConfig(config: HeatmapCardConfig): void {
    // console.log('HeatmapCard setConfig called with:', JSON.parse(JSON.stringify(config)));

    if (!config) {
      // console.error('HeatmapCard: Config is null or undefined.');
      this._error = 'Configuration is missing.';
      this._config = { type: 'custom:heatmap-card', background:'', points:[] }; // Minimal valid config
      this._loading = false;
      return;
    }
    
    let finalConfig: HeatmapCardConfig;

    // Check if the provided config is minimal (e.g., only type, background, points)
    // This often happens when a card is first added via UI before full configuration
    if (Object.keys(config).length <= 3 && config.type && config.background !== undefined && config.points !== undefined) {
        // console.log('HeatmapCard: Minimal config detected, using stub config as base');
        // Use stub config as the base, but preserve any explicitly set values
        const stubConfig = HeatmapCard.getStubConfig(this.hass, this._entities.size > 0 ? Array.from(this._entities) : undefined, undefined) as HeatmapCardConfig;
        finalConfig = { ...stubConfig, ...config }; 
    } else {
        finalConfig = { ...ConfigValidator.getDefaultConfig(), ...config };
    }
    
    this._config = finalConfig;

    const validation = ConfigValidator.validate(this._config);
    if (!validation.valid) {
      this._error = `Configuration Error:\n- ${validation.errors.join('\n- ')}`;
      console.error('HeatmapCard Configuration Errors:', validation.errors); 
      this.requestUpdate();
      return;
    }

    this._error = null;
    this._loading = true;
    this._imageLoaded = false;
    this._entities.clear();

    this._config.points.forEach(point => {
      if (point.entity_id) {
        this._entities.add(point.entity_id);
      }
    });

    if (this.hass) {
        this._updateEntityValues();
    }

    this._startUpdateInterval(); 
    this.requestUpdate(); 
  }

  public getCardSize(): number {
    return this._config?.height ? Math.round(this._config.height / 50) : 4;
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    // console.log('HeatmapCard firstUpdated. Config available:', !!this._config, 'Hass available:', !!this.hass); 
    
    if (this._config) {
        if (this._imageLoaded && this.shadowRoot) {
            // console.log('HeatmapCard firstUpdated: Image already loaded, ensuring heatmap is setup.');
            this._setupHeatmap();
            this._updateHeatmap(); 
        } else if (!this._config.background && this.shadowRoot) {
            // console.log('HeatmapCard firstUpdated: No background image configured. Setting up heatmap directly.');
            this._loading = false; 
            this._imageLoaded = true; 
            this._setupHeatmap();
            this._updateHeatmap(); 
        } else if (this._config.background) {
            // this._loading = true; // This was redundant, _loading is set in setConfig
            // The render method will handle showing the loading overlay while the image (now in DOM) loads.
        } else {
             this._loading = false;
             this._imageLoaded = true;
        }
        this._startUpdateInterval();
    } else {
        // console.warn('HeatmapCard firstUpdated: _config is not yet set. Heatmap setup will be deferred.');
         if (!this._error) {
            this._error = "Card configuration not loaded.";
         }
    }
    this.requestUpdate();
  }
  
  connectedCallback(): void {
    super.connectedCallback();
    // console.log('HeatmapCard connectedCallback triggered!');
    if (this.hass && this._config && this._entities.size > 0) {
        this._updateEntityValues();
        if (this._imageLoaded) this._updateHeatmap();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // console.log('HeatmapCard disconnectedCallback triggered!');
    this._stopUpdateInterval();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
  }
  
  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    // console.log('HeatmapCard updated. Changed props:', changedProps);
    if (changedProps.has('hass') && this.hass && this._config) {
      // console.log('HeatmapCard hass updated.');
      this._updateEntityValues();
      if(this._imageLoaded && this._heatmapInstance) {
          this._updateHeatmap();
      }
    }
    if (changedProps.has('_config') && changedProps.get('_config') !== undefined && this._imageLoaded) {
        // console.log('HeatmapCard _config changed, re-setting up and updating heatmap.');
        if(this.shadowRoot) this._setupHeatmap();
        this._updateHeatmap();
    }
  }

  render() {
    // console.log('HeatmapCard render called. Error:', this._error, 'Loading:', this._loading, 'ImageLoaded:', this._imageLoaded, 'Configured:', !!this._config);

    if (!this._config && !this._error) {
        // console.log('HeatmapCard rendering: Waiting for configuration...');
        return html`
            <ha-card header="Heatmap Card">
                <div class="loading-overlay">
                    <ha-circular-progress indeterminate></ha-circular-progress>
                    <p>Initializing Card...</p>
                </div>
            </ha-card>
        `;
    }
    
    if (this._error) {
      return html`
        <ha-card .header="${this._config?.title || 'Heatmap Card'}">
          <div class="error-container">
            <div class="error-title">${this._error.startsWith("Configuration Error:") ? "Configuration Error" : "Error"}</div>
            <pre class="error-message">${this._error.startsWith("Configuration Error:") ? this._error.substring("Configuration Error:\n".length) : this._error}</pre>
          </div>
        </ha-card>
      `;
    }

    // If config is present, always render the main structure
    // The loading indicator will be an overlay
    // console.log('HeatmapCard rendering main content structure.');
    return html`
      <ha-card .header="${this._config.title || 'Heatmap Card'}">
        <div class="card-container">
          <div class="heatmap-wrapper" id="heatmap-wrapper">
            ${this._config.background ? html`
              <img
                class="background-image ${this._imageLoaded ? 'loaded' : ''}"
                src="${this._config.background}"
                @load="${this._onImageLoad}"
                @error="${this._onImageError}"
                alt="Heatmap Background"
                style="${this._imageLoaded ? '' : 'display: block; visibility: hidden;'}" /* Keep in layout, but hidden */
              />
              ${(this._loading && !this._imageLoaded) ? html`
                <div class="loading-overlay ${this._imageLoaded ? 'hidden' : ''}">
                  <ha-circular-progress indeterminate></ha-circular-progress>
                  <p>Loading Background Image...</p>
                  ${this._config.width && this._config.height ? 
                    html`<div style="width: ${this._config.width}px; height: ${this._config.height}px; position:absolute; top:0; left:0; z-index:-1;"></div>` : ''}
                </div>
              ` : ''}
            ` : ''}
            
            ${this._config.show_labels && (this._imageLoaded || !this._config.background) ? this._renderLabels() : ''}
            ${this._config.show_legend && (this._imageLoaded || !this._config.background) ? this._renderLegend() : ''}
          </div>
          <div class="tooltip" id="tooltip"></div>
        </div>
      </ha-card>
    `;
  }

  private _renderLabels() {
    if (!this._config || !this._config.show_labels) return '';
    // console.log('HeatmapCard _renderLabels called.');
    return html`
      ${this._config.points.map(point => {
        if (!point.label) return '';
        const value = this._getPointValue(point);
        if (typeof point.x !== 'number' || typeof point.y !== 'number') return '';
        return html`
          <div
            class="point-label"
            style="left: ${point.x}px; top: ${point.y}px;"
          >
            ${point.label}: ${value !== null ? value.toFixed(1) : 'N/A'}${this._config.legend_unit || ''}
          </div>
        `;
      })}
    `;
  }

  private _renderLegend() {
    if (!this._config || !this._config.show_legend) return '';
    const minValue = this._getMinValue();
    const maxValue = this._getMaxValue();
    const gradientString = this._createGradientString();

    console.log(`HeatmapLegend: minValue = ${minValue}, maxValue = ${maxValue}`);

    if (minValue === null || maxValue === null) {
        return '';
    }

    return html`
      <div class="legend">
        <div
          class="legend-gradient"
          style="background: linear-gradient(${this._getLegendGradientDirection()}, ${gradientString});"
        ></div>
        <div class="legend-labels">
          <span>${maxValue.toFixed(1)}${this._config.legend_unit || ''}</span>
          <span>${minValue.toFixed(1)}${this._config.legend_unit || ''}</span>
        </div>
      </div>
    `;
  }

  private _getLegendGradientDirection(): string {
    return 'to top';
  }

  private _createGradientString(): string {
    const gradient = this._config.gradient || ConfigValidator.getDefaultConfig().gradient || {};
    const positions = Object.keys(gradient)
      .map(p => parseFloat(p))
      .sort((a, b) => a - b);

    return positions
      .map(pos => `${gradient[pos]} ${pos * 100}%`)
      .join(', ');
  }

  private _onImageLoad(): void {
    if (!this._config) return;
    // console.log('HeatmapCard _onImageLoad triggered. Background:', this._config.background); 
    this._imageLoaded = true;
    this._loading = false; 
    this.requestUpdate(); // Request update to re-render with the image visible and loading overlay hidden

    // Defer heatmap setup slightly to ensure image dimensions are available
    requestAnimationFrame(() => {
      if (this.shadowRoot) {
          this._setupHeatmap();
          this._updateHeatmap(); 
      } else {
          // console.warn('HeatmapCard _onImageLoad (RAF): shadowRoot not available yet for _setupHeatmap.');
      }
    });
  }

  private _onImageError(): void {
    if (!this._config) return;
    console.error('HeatmapCard _onImageError: Failed to load background image at', this._config.background); 
    this._loading = false;
    this._imageLoaded = false; 
    this._error = this._config.error_message || `Failed to load background image: ${this._config.background}`;
    this.requestUpdate();
  }

  private _setupHeatmap(): void {
    if (!this.shadowRoot) {
        // console.warn('HeatmapCard _setupHeatmap: shadowRoot not available. Aborting.');
        return;
    }
    const wrapper = this.shadowRoot.getElementById('heatmap-wrapper');
    // console.log('HeatmapCard _setupHeatmap called. Wrapper:', !!wrapper, 'ImageLoaded:', this._imageLoaded, 'Config:', !!this._config);

    if (!wrapper || (!this._imageLoaded && this._config.background) || !this._config ) {
      // console.warn('HeatmapCard _setupHeatmap: Conditions not met. Wrapper:', !!wrapper, 'ImageLoaded:', this._imageLoaded, 'Bg:', !!(this._config && this._config.background) );
      return;
    }

    // Ensure the main container for our canvas exists
    if (!this._container) {
        this._container = this.shadowRoot.getElementById('heatmap-canvas-container') as HTMLElement | null;
        if (!this._container) {
            this._container = document.createElement('div');
            this._container.id = 'heatmap-canvas-container';
            // Styles for this container are in CSS
            if (wrapper) {
                 wrapper.appendChild(this._container);
                 // console.log('HeatmapCard: Created and appended heatmap-canvas-container to wrapper');
            }
        } else {
            // console.log('HeatmapCard: Found existing heatmap-canvas-container');
        }
    }
    if (this._container && !this._container.parentElement && wrapper) {
        wrapper.appendChild(this._container);
        // console.log('HeatmapCard: Re-appended heatmap-canvas-container to wrapper');
    }
    
    let targetWidth: number | undefined;
    let targetHeight: number | undefined;

    if (this._config.background) {
        const img = wrapper.querySelector('.background-image') as HTMLImageElement;
        if (!img || !img.complete || !img.naturalWidth || !img.naturalHeight) {
            // console.warn("HeatmapCard _setupHeatmap: Background image not ready/valid.");
            if (!this._config.width || !this._config.height) {
                 this._error = `Background image ('${this._config.background || ''}') invalid & no card dimensions.`;
                 this._imageLoaded = false; 
                 this.requestUpdate();
                 return;
            }
            targetWidth = this._config.width;
            targetHeight = this._config.height;
        } else {
            targetWidth = this._config.width || img.naturalWidth;
            targetHeight = this._config.height || img.naturalHeight;
        }
    } else { 
        targetWidth = this._config.width || wrapper.clientWidth || 300;
        targetHeight = this._config.height || wrapper.clientHeight || 200;
    }
    
    if (!targetWidth || !targetHeight) {
        this._error = "Failed to determine dimensions for heatmap.";
        if(this._config.background) this._imageLoaded = false;
        this.requestUpdate();
        return;
    }

    // Set dimensions for the container that HOLDS the canvas
    this._container.style.width = `${targetWidth}px`;
    this._container.style.height = `${targetHeight}px`;
    // z-index for this container is in CSS

    // Create or get the canvas element
    if (!this._canvasElement) {
        this._canvasElement = this.shadowRoot.querySelector('#heatmap-canvas-element') as HTMLCanvasElement | null;
        if (!this._canvasElement) {
            this._canvasElement = document.createElement('canvas');
            this._canvasElement.id = 'heatmap-canvas-element';
            this._container.appendChild(this._canvasElement);
            // console.log('HeatmapCard: Created and appended canvas element to #heatmap-canvas-container.');
        }
    }
    // Ensure canvas is a child of the container
    if (this._canvasElement.parentElement !== this._container) {
        this._container.appendChild(this._canvasElement);
    }

    this._canvasElement.width = targetWidth;
    this._canvasElement.height = targetHeight;
    // Styles for the canvas element itself are in CSS part of #heatmap-canvas-container canvas
    
    // console.log(`HeatmapCard: Canvas dimensions set to ${targetWidth}x${targetHeight}`);

    try {
        this._heatmapInstance = simpleheat(this._canvasElement);
        // console.log('HeatmapCard _setupHeatmap: simpleheat instance created.');
        
        // Configure simpleheat instance (radius, gradient) - these are set before draw
        this._heatmapInstance.radius(this._config.radius || 25, this._config.blur || 15);
        // console.log(`simpleheat radius set to: ${this._config.radius || 25}, blur: ${this._config.blur || 15}`);

        const gradientConfig = this._config.gradient || ConfigValidator.getDefaultConfig().gradient;
        if (gradientConfig) {
             this._heatmapInstance.gradient(gradientConfig as { [key: number]: string });
             // console.log('simpleheat gradient configured.');
        }

    } catch(e) {
        console.error("Error creating simpleheat instance:", e);
        this._error = "Failed to create heatmap instance (simpleheat). Check console.";
        this.requestUpdate();
        return;
    }

    this._setupMouseEvents(); // Mouse events remain on the wrapper
    this._setupResizeObserver(wrapper);
  }

  private _setupMouseEvents(): void {
    const wrapper = this.shadowRoot?.getElementById('heatmap-wrapper');
    if (!wrapper) return;

    const tooltip = this.shadowRoot?.getElementById('tooltip') as HTMLElement;
    if (!tooltip) return;

    wrapper.onmousemove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const nearestPoint = this._findNearestPoint(x, y);
      if (nearestPoint && this._config.radius && this._getDistance(x, y, nearestPoint.x, nearestPoint.y) < (this._config.radius || 40)) {
        const value = this._getPointValue(nearestPoint);
        tooltip.innerHTML = `${nearestPoint.label || 'Value'}: ${value !== null ? value.toFixed(1) : 'N/A'}${this._config.legend_unit || ''}`;
        
        tooltip.style.left = `${e.clientX + 15}px`;
        tooltip.style.top = `${e.clientY - 30}px`;
        tooltip.classList.add('visible');
      } else {
        tooltip.classList.remove('visible');
      }
    };

    wrapper.onmouseleave = () => {
      tooltip.classList.remove('visible');
    };
     // console.log("HeatmapCard Mouse events setup on wrapper:", wrapper);
  }

  private _findNearestPoint(x: number, y: number): HeatmapPoint | null {
    if (!this._config || !this._config.points) return null;
    let nearest: HeatmapPoint | null = null;
    let minDistance = Infinity;

    this._config.points.forEach(point => {
      if (typeof point.x !== 'number' || typeof point.y !== 'number') return;
      const distance = this._getDistance(x, y, point.x, point.y);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = point;
      }
    });
    return nearest;
  }

  private _getDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  private _setupResizeObserver(observeTarget: HTMLElement): void {
    if (this._resizeObserver) {
        this._resizeObserver.disconnect();
    }
    this._resizeObserver = new ResizeObserver(_entries => {
        // console.log("HeatmapCard ResizeObserver triggered. Resizing heatmap.");
        if (this.shadowRoot && this._imageLoaded && this._config) {
            this._setupHeatmap();
            this._updateHeatmap();
        }
    });
    if(observeTarget) {
        this._resizeObserver.observe(observeTarget);
        // console.log("HeatmapCard ResizeObserver setup on:", observeTarget);
    } else {
        console.warn("HeatmapCard ResizeObserver: observeTarget is null, cannot observe.")
    }
  }

  private _updateEntityValues(): void {
    if (!this.hass || !this._config || !this._entities) return;
    let valuesChanged = false;
    this._entities.forEach(entityId => {
      const state = this.hass.states[entityId];
      const oldValue = this._currentValues.get(entityId);
      if (state && state.state !== 'unavailable' && state.state !== 'unknown') {
        const value = parseFloat(state.state);
        if (!isNaN(value)) {
          if (this._currentValues.get(entityId) !== value) {
            this._currentValues.set(entityId, value);
            valuesChanged = true;
          }
        } else {
            if (oldValue !== undefined) {
                this._currentValues.delete(entityId);
                valuesChanged = true;
                // console.warn(`Entity ${entityId} state '${state.state}' is not a number.`);
            }
        }
      } else {
          if (oldValue !== undefined) {
              this._currentValues.delete(entityId);
              valuesChanged = true;
              // console.warn(`Entity ${entityId} is ${state ? state.state : 'not found'}.`);
          }
      }
    });
    if (valuesChanged && this._imageLoaded && this._heatmapInstance) {
        // console.log("HeatmapCard Entity values changed, updating heatmap.");
        this._updateHeatmap();
    }
  }

  private _getPointValue(point: HeatmapPoint): number | null {
    if (point.value !== undefined) {
      return point.value;
    }
    
    if (point.entity_id && this.hass) {
        if (this._currentValues.has(point.entity_id)) {
            return this._currentValues.get(point.entity_id) as number;
        }
        
        const state = this.hass.states[point.entity_id];
        if (state && state.state !== 'unavailable' && state.state !== 'unknown') {
            const value = parseFloat(state.state);
            return !isNaN(value) ? value : null;
        } else {
            // console.warn('Entity not found or unavailable:', point.entity_id);
        }
    }
    
    return null;
  }

  private _updateHeatmap(): void {
    if (!this._heatmapInstance || !this._config || !this._config.points) {
        // console.warn("HeatmapCard _updateHeatmap: simpleheat instance or config/points not available.");
        return;
    }
    // console.log("HeatmapCard _updateHeatmap called (simpleheat).");

    const simpleHeatDataPoints: SimpleHeatPoint[] = [];
    const currentPointValues: number[] = []; // Still used for min/max calculation for legend

    this._config.points.forEach((point) => {
      const value = this._getPointValue(point);
      if (value !== null && typeof point.x === 'number' && typeof point.y === 'number') {
        currentPointValues.push(value); // Raw value for legend scaling
        // simpleheat data format: [x, y, value (for intensity)]
        // The 'value' here is for heatmap intensity, not directly the legend value if weighted.
        // For simpleheat, the third parameter in `data` is the intensity.
        // If a point has a weight, we should apply it here for simpleheat's intensity.
        const intensityValue = value * (point.weight !== undefined ? point.weight : 1.0);
        simpleHeatDataPoints.push([Math.round(point.x), Math.round(point.y), intensityValue]);
      }
    });

    if(simpleHeatDataPoints.length === 0 && this._config.points.length > 0){
        // console.warn("HeatmapCard _updateHeatmap: No valid data points to render for simpleheat.");
        this._heatmapInstance.clear(); // Clear previous data
        this._heatmapInstance.draw(0);   // Draw an empty heatmap (or to clear it)
        return;
    }

    // Legend still uses min/max from currentPointValues (raw, unweighted)
    const minValueForLegend = this._getMinValue(currentPointValues);
    const maxValueForLegend = this._getMaxValue(currentPointValues);

    if (minValueForLegend === null || maxValueForLegend === null) {
        // console.warn("HeatmapCard _updateHeatmap: Min or Max value is null for legend. Clearing heatmap.");
        this._heatmapInstance.clear();
        this._heatmapInstance.draw(0);
        return;
    }
    
    // For simpleheat, the .max() method sets the scale for the 'value' in data points.
    // We need to determine what this max should be. If auto_scale, it might be the max of weighted values.
    // Let's calculate max of intensity values for simpleheat's scaling
    let maxIntensity = 0;
    if (this._config.auto_scale && simpleHeatDataPoints.length > 0) {
        maxIntensity = simpleHeatDataPoints.reduce((max, p) => Math.max(max, p[2]), 0);
    } else if (this._config.max_value !== undefined) { // If max_value is explicitly set, use it for heatmap intensity scale
        maxIntensity = this._config.max_value;
    } else { // Default max intensity if not auto_scale and no max_value
        maxIntensity = 100; 
    }
    // Ensure maxIntensity is at least a small positive number if there are points, to avoid issues with max 0
    if (simpleHeatDataPoints.length > 0 && maxIntensity === 0 && currentPointValues.some(v => v !== 0)) {
        maxIntensity = Math.max(...currentPointValues.map(v => Math.abs(v)), 1); // Use max of absolute raw values or 1
    } else if (maxIntensity === 0 && simpleHeatDataPoints.length > 0) {
        maxIntensity = 1; // Default if all intensity values are 0 but points exist
    }


    // console.log("simpleheat data for drawing:", JSON.parse(JSON.stringify(simpleHeatDataPoints)));
    // console.log("simpleheat .max() will be set to:", maxIntensity);
    // console.log("Legend min/max:", minValueForLegend, "/", maxValueForLegend);

    this._heatmapInstance.clear(); // Clear previous data
    this._heatmapInstance.data(simpleHeatDataPoints);
    this._heatmapInstance.max(maxIntensity); // Set the max for simpleheat's internal scaling of intensity

    // Re-apply radius and gradient as they might be reset or need to be set before each draw
    this._heatmapInstance.radius(this._config.radius || 25, this._config.blur || 15);
    const gradientConfig = this._config.gradient || ConfigValidator.getDefaultConfig().gradient;
    if (gradientConfig) {
         this._heatmapInstance.gradient(gradientConfig as { [key: number]: string });
    }
    
    // Draw the heatmap. `minOpacity` for points.
    // The overall opacity of the heatmap layer is controlled by CSS on #heatmap-canvas-container or its canvas child.
    // simpleheat's `draw` opacity is for the faintest points.
    const drawMinOpacity = this._config.opacity !== undefined ? (this._config.opacity / 2) : 0.05; // Example: derive from main opacity
    this._heatmapInstance.draw(drawMinOpacity); 
    // console.log('simpleheat draw called with minOpacity:', drawMinOpacity);

    // No need to check canvas content like before, simpleheat should handle it.
  }

  private _getMinValue(values?: number[]): number | null {
    // console.log('HeatmapCard _getMinValue CALLED. Input values:', JSON.parse(JSON.stringify(values || []))); // Minimal logs
    // console.log('Configured min_value:', this._config.min_value, 'auto_scale:', this._config.auto_scale, 'scale_margin:', this._config.scale_margin); // Minimal logs

    if (this._config.min_value !== undefined) {
      // console.log('HeatmapCard _getMinValue: Using explicitly configured min_value:', this._config.min_value);
      return this._config.min_value;
    }
    const pointValues = values || this._config.points.map(p => this._getPointValue(p)).filter(v => v !== null) as number[];
    // console.log('HeatmapCard _getMinValue: Calculated pointValues for min calculation:', JSON.parse(JSON.stringify(pointValues)));
    
    if (pointValues.length === 0) {
      // console.log('HeatmapCard _getMinValue: No pointValues, returning default 0.');
      return 0;
    }

    if (this._config.auto_scale) {
      const min = Math.min(...pointValues);
      if (!isFinite(min)) {
        // console.log('HeatmapCard _getMinValue: Min is not finite, returning 0.');
        return 0;
      }
      const max = Math.max(...pointValues);
       if (!isFinite(max)) { // If max is not finite but min is, use min as baseline
        // console.log('HeatmapCard _getMinValue: Max is not finite (min is finite), returning min value itself:', min);
        return min;
      }
      const margin = this._config.scale_margin !== undefined ? this._config.scale_margin : 0;
      const range = max - min;
      // If range is 0, margin calculation doesn't make sense, just return min
      const result = range === 0 ? min : min - (range * margin / 100);
      // console.log(`HeatmapCard _getMinValue: Auto-scaled min: ${result} (Points: [${pointValues.join(', ')}], Original Min: ${min}, Original Max: ${max}, Range: ${range}, Margin: ${margin}%)`); // Minimal logs
      return result;
    }
    // console.log('HeatmapCard _getMinValue: auto_scale is false, returning default 0.'); // Minimal logs
    return 0;
  }

  private _getMaxValue(values?: number[]): number | null {
    // console.log('HeatmapCard _getMaxValue CALLED. Input values:', JSON.parse(JSON.stringify(values || []))); // Minimal logs
    // console.log('Configured max_value:', this._config.max_value, 'auto_scale:', this._config.auto_scale, 'scale_margin:', this._config.scale_margin); // Minimal logs
    
    if (this._config.max_value !== undefined) {
      // console.log('HeatmapCard _getMaxValue: Using explicitly configured max_value:', this._config.max_value);
      return this._config.max_value;
    }
    const pointValues = values || this._config.points.map(p => this._getPointValue(p)).filter(v => v !== null) as number[];
    // console.log('HeatmapCard _getMaxValue: Calculated pointValues for max calculation:', JSON.parse(JSON.stringify(pointValues)));
    
    if (pointValues.length === 0) {
      // console.log('HeatmapCard _getMaxValue: No pointValues, returning default 100.');
      return 100;
    }

    if (this._config.auto_scale) {
      const min = Math.min(...pointValues);
      const max = Math.max(...pointValues);
      if (!isFinite(max)) {
        // console.log('HeatmapCard _getMaxValue: Max is not finite, returning 100.');
        return 100;
      }
      if (!isFinite(min) && isFinite(max)) { // If min is not finite but max is, use max as baseline
         // console.log('HeatmapCard _getMaxValue: Min is not finite (max is finite), returning max value itself:', max);
        return max;
      }
       if (!isFinite(min) && !isFinite(max)) { // Both not finite
        // console.log('HeatmapCard _getMaxValue: Both min and max are not finite, returning 100.');
        return 100;
      }

      const margin = this._config.scale_margin !== undefined ? this._config.scale_margin : 0;
      const range = max - min;
      // If range is 0, margin calculation doesn't make sense, just return max
      const result = range === 0 ? max : max + (range * margin / 100);
      // console.log(`HeatmapCard _getMaxValue: Auto-scaled max: ${result} (Points: [${pointValues.join(', ')}], Original Min: ${min}, Original Max: ${max}, Range: ${range}, Margin: ${margin}%)`); // Minimal logs
      return result;
    }
    // console.log('HeatmapCard _getMaxValue: auto_scale is false, returning default 100.'); // Minimal logs
    return 100;
  }

  private _startUpdateInterval(): void {
    this._stopUpdateInterval();
    if (!this._config || this._config.update_interval === undefined) return;

    const intervalSeconds = this._config.update_interval;
    if (intervalSeconds >= 5 && intervalSeconds <= 3600) {
        this._updateInterval = window.setInterval(() => {
          // console.log("HeatmapCard Interval: Updating entity values and heatmap.");
          this._updateEntityValues();
        }, intervalSeconds * 1000);
        // console.log(`HeatmapCard Update interval started: ${intervalSeconds}s`);
    } else {
        console.warn(`HeatmapCard: Invalid update_interval (${intervalSeconds}s), not starting timer.`);
    }
  }

  private _stopUpdateInterval(): void {
    if (this._updateInterval) {
      window.clearInterval(this._updateInterval);
      this._updateInterval = null;
      // console.log("HeatmapCard Update interval stopped.");
    }
  }
} 