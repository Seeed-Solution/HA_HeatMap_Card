import { LovelaceCardConfig } from 'custom-card-helpers';

export interface HeatmapPoint {
  x: number;
  y: number;
  entity_id?: string;
  value?: number;
  label?: string;
  weight?: number;
}

export interface HeatmapGradient {
  [position: number]: string;
}

export interface HeatmapCardConfig extends LovelaceCardConfig {
  type: string;
  background: string;
  width?: number;
  height?: number;
  radius?: number;
  blur?: number;
  auto_scale?: boolean;
  scale_margin?: number;
  update_interval?: number;
  min_value?: number;
  max_value?: number;
  opacity?: number;
  gradient?: HeatmapGradient;
  show_legend?: boolean;
  legend_unit?: string;
  show_labels?: boolean;
  error_message?: string;
  points: HeatmapPoint[];
}

export interface HeatmapDataPoint {
  x: number;
  y: number;
  value: number;
  max?: number;
  min?: number;
}

// Home Assistant types
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