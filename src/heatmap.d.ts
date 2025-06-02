declare module 'heatmap.js' {
  interface HeatmapDataPoint {
    x: number;
    y: number;
    value: number;
  }

  interface HeatmapData {
    min: number;
    max: number;
    data: HeatmapDataPoint[];
  }

  interface HeatmapConfig {
    container: HTMLElement;
    radius?: number;
    maxOpacity?: number;
    minOpacity?: number;
    blur?: number;
    gradient?: { [key: string]: string };
    width?: number;
    height?: number;
  }

  interface HeatmapInstance {
    setData(data: HeatmapData): void;
    addData(data: HeatmapDataPoint | HeatmapDataPoint[]): void;
    setDataMax(max: number): void;
    setDataMin(min: number): void;
    getData(): HeatmapData;
  }

  interface HeatmapFactory {
    create(config: HeatmapConfig): HeatmapInstance;
  }

  const h337: HeatmapFactory;
  export = h337;
} 