# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-06-02

### Added
- Initial release of the Heatmap Card for Home Assistant
- Support for PNG, JPG, and SVG background images
- Real-time heatmap rendering using simpleheat
- Dynamic binding to Home Assistant entity values
- Configurable auto-update intervals (5-3600 seconds)
- Customizable color gradients
- Auto-scaling with adjustable margins
- Interactive tooltips showing values on hover
- Optional legend (fixed bottom-right, vertical position)
- Responsive design for all devices
- Comprehensive error handling and validation
- Support for static values and weighted points
- Point labels display option
- Custom error messages
- Loading states with skeleton screens
- Mouse hover interactions
- ResizeObserver for responsive updates

### Features
- Maximum 100 heat points support
- Memory efficient (< 50MB)
- Performance optimized with batched updates
- TypeScript implementation with full type safety
- Lit Element based for modern web component architecture
- HACS compatible installation 