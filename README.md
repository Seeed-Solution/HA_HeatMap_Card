# 🔥 Home Assistant Heatmap Card

A custom Lovelace card for Home Assistant that displays beautiful heatmaps overlaid on background images. Perfect for visualizing temperature distributions, sensor data, or any numeric values across floor plans or other images.

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE)
[![hacs][hacsbadge]][hacs]

![Heatmap Card Example](docs/images/example.png)

## ✨ Features

- 📷 Support for PNG, JPG, and SVG background images
- 🔥 Real-time heatmap rendering using simpleheat
- 🧩 Dynamic binding to Home Assistant entity values
- 🔁 Configurable auto-update intervals
- 🎨 Customizable color gradients
- 📈 Auto-scaling with adjustable margins
- 💬 Interactive tooltips showing values on hover
- 📊 Optional legend with customizable position
- 📱 Responsive design for all devices
- 🛡️ Comprehensive error handling

## 📦 Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend" section
3. Click the "+" button
4. Search for "Heatmap Card"
5. Click "Install"
6. Restart Home Assistant

### Manual Installation

1. Download `heatmap-card.js` from the [latest release][releases]
2. Copy it to `/config/www/heatmap-card.js`
3. Add the resource in your Lovelace configuration:

```yaml
resources:
  - url: /local/heatmap-card.js
    type: module
```

## 🚀 Quick Start

Add this to your Lovelace dashboard:

```yaml
type: custom:heatmap-card
background: /local/floorplan.png
points:
  - x: 120
    y: 100
    entity_id: sensor.living_room_temperature
    label: "Living Room"
  - x: 320
    y: 180
    entity_id: sensor.kitchen_temperature
    label: "Kitchen"
  - x: 200
    y: 300
    entity_id: sensor.bedroom_temperature
    label: "Bedroom"
```

## ⚙️ Configuration

### Basic Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `background` | string | **Required** | Path to background image |
| `points` | array | **Required** | Array of heatmap points |
| `width` | number | auto | Card width in pixels |
| `height` | number | auto | Card height in pixels |

### Heatmap Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | number | 40 | Heat point radius (min: 1) |
| `blur` | number | 15 | Additional blur radius in pixels (min: 0) |
| `opacity` | number | 0.6 | Heatmap opacity (0-1) |
| `gradient` | object | Blue→Green→Red | Color gradient configuration |

### Scaling Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `auto_scale` | boolean | false | Enable automatic value scaling |
| `scale_margin` | number | 0 | Margin percentage for auto-scaling (0-50) |
| `min_value` | number | 0 | Manual minimum value |
| `max_value` | number | 100 | Manual maximum value |

### Display Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `show_legend` | boolean | false | Show color scale legend |
| `legend_unit` | string | "" | Unit text for legend |
| `show_labels` | boolean | false | Show value labels on points |
| `update_interval` | number | 30 | Update interval in seconds (5-3600) |

### Point Configuration

Each point in the `points` array supports:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `x` | number | ✅ | X coordinate on image |
| `y` | number | ✅ | Y coordinate on image |
| `entity_id` | string | ❌ | Home Assistant entity ID |
| `value` | number | ❌ | Static value (if no entity_id) |
| `label` | string | ❌ | Display label |
| `weight` | number | ❌ | Point weight multiplier (0.1-2.0) |

**Note:** Each point must have either `entity_id` or `value`, but not both.

## 📊 Examples

### Temperature Monitoring with Auto-scaling

```yaml
type: custom:heatmap-card
background: /local/house_floorplan.svg
auto_scale: true
scale_margin: 10
show_legend: true
legend_unit: "°C"
update_interval: 60
gradient:
  0.0: "#0000ff"  # Cold - Blue
  0.5: "#00ff00"  # Moderate - Green
  1.0: "#ff0000"  # Hot - Red
points:
  - x: 150
    y: 200
    entity_id: sensor.living_room_temp
    label: "Living Room"
  - x: 450
    y: 200
    entity_id: sensor.kitchen_temp
    label: "Kitchen"
  - x: 150
    y: 400
    entity_id: sensor.bedroom_temp
    label: "Bedroom"
  - x: 450
    y: 400
    entity_id: sensor.bathroom_temp
    label: "Bathroom"
```

### Energy Usage Visualization

```yaml
type: custom:heatmap-card
background: /local/office_layout.png
radius: 60
blur: 20
opacity: 0.7
show_labels: true
min_value: 0
max_value: 1000
legend_unit: "W"
gradient:
  0.0: "#00ff00"  # Low usage - Green
  0.3: "#ffff00"  # Medium - Yellow
  0.6: "#ff8800"  # High - Orange
  1.0: "#ff0000"  # Very high - Red
points:
  - x: 100
    y: 150
    entity_id: sensor.desk_power
    label: "Desk"
  - x: 300
    y: 150
    entity_id: sensor.server_power
    label: "Server"
  - x: 200
    y: 300
    entity_id: sensor.ac_power
    label: "AC Unit"
```

### Mixed Static and Dynamic Values

```yaml
type: custom:heatmap-card
background: /local/garden.jpg
show_legend: true
legend_unit: "%"
points:
  # Dynamic sensor values
  - x: 100
    y: 100
    entity_id: sensor.soil_moisture_1
    label: "Tomatoes"
  - x: 200
    y: 100
    entity_id: sensor.soil_moisture_2
    label: "Peppers"
  # Static reference points
  - x: 300
    y: 200
    value: 100
    label: "Water Source"
    weight: 0.5
  - x: 50
    y: 250
    value: 0
    label: "Dry Spot"
    weight: 0.5
```

## 🎨 Custom Color Gradients

Create custom gradients by specifying color stops at positions from 0 to 1:

```yaml
gradient:
  0.0: "#ffffff"   # White at minimum
  0.2: "#ffcccc"   # Light red
  0.4: "#ff9999"   # 
  0.6: "#ff6666"   # 
  0.8: "#ff3333"   # 
  1.0: "#ff0000"   # Red at maximum
```

### Predefined Gradient Examples

**Cool to Warm:**
```yaml
gradient:
  0.0: "#001f3f"  # Navy
  0.25: "#0074D9" # Blue
  0.5: "#39CCCC"  # Teal
  0.75: "#FFDC00" # Yellow
  1.0: "#FF4136"  # Red
```

**Monochrome:**
```yaml
gradient:
  0.0: "#ffffff"  # White
  0.5: "#888888"  # Gray
  1.0: "#000000"  # Black
```

## 🔍 Finding Coordinates

To find the correct x,y coordinates for your points:

1. Open your background image in an image editor
2. Note the pixel coordinates where you want to place heat points
3. If using `width`/`height` settings, scale coordinates proportionally
4. Use browser developer tools to fine-tune positions

## 🐛 Troubleshooting

### Image not loading
- Check the image path is correct
- Ensure the image is in `/config/www/heatmap-card/` for local images
- Use `/local/heatmap-card/` prefix for local images

### Entity values not updating
- Verify entity IDs are correct
- Check entities exist in Developer Tools > States
- Ensure entity values are numeric

### Heatmap not showing
- Check browser console for errors
- Verify at least one point has a valid value
- Try increasing radius or opacity

## 🛠️ Development Setup

If you want to contribute to the development of this card or make your own customizations, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Seeed-Solution/lovelace-heatmap-card.git
    cd lovelace-heatmap-card
    ```

2.  **Install Dependencies:**
    This project uses [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/). Make sure you have them installed. Then, install the project dependencies:
    ```bash
    npm install
    ```

3.  **Build the Card:**
    To build the `heatmap-card.js` file from the source code, run:
    ```bash
    npm run build
    ```
    This will compile the TypeScript code and bundle it into the `dist/` directory.

4.  **Development Workflow (Watch for changes):**
    To automatically rebuild the card whenever you make changes to the source files in `src/`, use:
    ```bash
    npm run dev
    ```
    This is useful during development as it keeps the `dist/heatmap-card.js` file up-to-date. You can then copy this file to your Home Assistant `www` directory to test your changes.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [simpleheat](https://github.com/mourner/simpleheat) for the lightweight and efficient heatmap library
- Home Assistant community for inspiration and feedback
- All contributors and users of this card

---

[releases-shield]: https://img.shields.io/github/release/Seeed-Solution/lovelace-heatmap-card.svg?style=for-the-badge
[releases]: https://github.com/Seeed-Solution/lovelace-heatmap-card/releases
[license-shield]: https://img.shields.io/github/license/Seeed-Solution/lovelace-heatmap-card.svg?style=for-the-badge
[hacs]: https://github.com/hacs/integration
[hacsbadge]: https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge 