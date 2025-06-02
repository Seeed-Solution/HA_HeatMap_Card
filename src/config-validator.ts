import { HeatmapCardConfig, HeatmapPoint } from './types';

export class ConfigValidator {
  static validate(config: HeatmapCardConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证必需字段
    if (!config.background) {
      errors.push('Background image is required');
    }

    if (!config.points || !Array.isArray(config.points)) {
      errors.push('Points array is required');
    } else if (config.points.length === 0) {
      errors.push('At least one point is required');
    } else {
      // 验证每个点
      config.points.forEach((point, index) => {
        const pointErrors = this.validatePoint(point, index);
        errors.push(...pointErrors);
      });
    }

    // 验证数值范围
    if (config.radius !== undefined && (config.radius < 10 || config.radius > 100)) {
      errors.push('Radius must be between 10 and 100');
    }

    if (config.blur !== undefined && (config.blur < 0 || config.blur > 50)) {
      errors.push('Blur must be between 0 and 50 pixels');
    }

    if (config.opacity !== undefined && (config.opacity < 0 || config.opacity > 1)) {
      errors.push('Opacity must be between 0 and 1');
    }

    if (config.scale_margin !== undefined && (config.scale_margin < 0 || config.scale_margin > 50)) {
      errors.push('Scale margin must be between 0 and 50');
    }

    if (config.update_interval !== undefined && (config.update_interval < 5 || config.update_interval > 3600)) {
      errors.push('Update interval must be between 5 and 3600 seconds');
    }

    if (config.min_value !== undefined && config.min_value < 0) {
      errors.push('Min value must be greater than or equal to 0');
    }

    if (config.max_value !== undefined && config.max_value <= 0) {
      errors.push('Max value must be greater than 0');
    }

    if (config.min_value !== undefined && config.max_value !== undefined && config.min_value >= config.max_value) {
      errors.push('Min value must be less than max value');
    }

    // 验证渐变配置
    if (config.gradient) {
      const gradientErrors = this.validateGradient(config.gradient);
      errors.push(...gradientErrors);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  private static validatePoint(point: HeatmapPoint, index: number): string[] {
    const errors: string[] = [];
    const prefix = `Point ${index + 1}:`;

    if (point.x === undefined || typeof point.x !== 'number') {
      errors.push(`${prefix} x coordinate is required and must be a number`);
    }

    if (point.y === undefined || typeof point.y !== 'number') {
      errors.push(`${prefix} y coordinate is required and must be a number`);
    }

    if (!point.entity_id && point.value === undefined) {
      errors.push(`${prefix} must have either entity_id or value`);
    }

    if (point.entity_id && point.value !== undefined) {
      errors.push(`${prefix} cannot have both entity_id and value`);
    }

    if (point.weight !== undefined && (point.weight < 0.1 || point.weight > 2.0)) {
      errors.push(`${prefix} weight must be between 0.1 and 2.0`);
    }

    return errors;
  }

  private static validateGradient(gradient: any): string[] {
    const errors: string[] = [];

    if (typeof gradient !== 'object') {
      errors.push('Gradient must be an object');
      return errors;
    }

    const positions = Object.keys(gradient);
    positions.forEach(pos => {
      const numPos = parseFloat(pos);
      if (isNaN(numPos) || numPos < 0 || numPos > 1) {
        errors.push(`Gradient position ${pos} must be a number between 0 and 1`);
      }

      const color = gradient[pos];
      if (typeof color !== 'string' || !this.isValidColor(color)) {
        errors.push(`Gradient color at position ${pos} is not a valid color`);
      }
    });

    return errors;
  }

  private static isValidColor(color: string): boolean {
    // 简单的颜色验证，支持 hex 和常见颜色名
    const hexRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
    const namedColors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'black', 'white', 'gray', 'grey'];
    
    return hexRegex.test(color) || namedColors.includes(color.toLowerCase());
  }

  static getDefaultConfig(): Partial<HeatmapCardConfig> {
    return {
      radius: 40,
      blur: 15,
      opacity: 0.6,
      auto_scale: false,
      scale_margin: 0,
      update_interval: 30,
      show_legend: false,
      legend_unit: '',
      show_labels: false,
      gradient: {
        0.0: '#d3d3d3',
        0.5: '#ffff00',
        1.0: '#ff0000'
      }
    };
  }
} 