# Configuration Guide

## Basic Configuration

The minimum configuration requires:
- A background image
- At least one heat point with coordinates and a value source

```yaml
type: custom:heatmap-card
background: /local/floorplan.png
points:
  - x: 100
    y: 100
    entity_id: sensor.temperature
```

## Complete Configuration Reference

```yaml
type: custom:heatmap-card

# Required
background: /local/floorplan.png    # Path to background image

# Required - Array of heat points
points:
  - x: 100                          # X coordinate (required)
    y: 100                          # Y coordinate (required)
    entity_id: sensor.temp          # Entity ID (optional)
    value: 25                       # Static value (optional)
    label: "Living Room"            # Display label (optional)
    weight: 1.0                     # Point weight 0.1-2.0 (optional)

# Optional - Card dimensions
width: 800                          # Width in pixels (auto if not set)
height: 600                         # Height in pixels (auto if not set)

# Optional - Heatmap appearance
radius: 40                          # Heat point radius (min: 1, default: 40)
blur: 15                            # Additional blur radius in pixels (min: 0, default: 15)
opacity: 0.6                        # Heatmap opacity 0-1 (default: 0.6)

# Optional - Value scaling
auto_scale: false                   # Enable auto-scaling (default: false)
scale_margin: 0                     # Margin % for auto-scale 0-50 (default: 0)
min_value: 0                        # Manual minimum value
max_value: 100                      # Manual maximum value

# Optional - Updates
update_interval: 30                 # Update interval in seconds 5-3600 (default: 30)

# Optional - Color gradient
gradient:                           # Custom color gradient (optional)
  0.0: "#d3d3d3"                   # Light Grey at minimum (default)
  0.5: "#ffff00"                   # Yellow at middle (default)
  1.0: "#ff0000"                   # Red at maximum (default)

# Optional - Legend
show_legend: false                  # Show color legend (default: false)
legend_unit: "°C"                   # Unit text for legend (optional)

# Optional - Labels
show_labels: false                  # Show value labels on points (default: false)

# Optional - Error handling
error_message: "Custom error"       # Custom error message (optional)
```

## Configuration Examples

### Temperature Monitoring

Monitor room temperatures with auto-scaling and a temperature gradient:

```yaml
type: custom:heatmap-card
background: /local/house_layout.png
auto_scale: true
scale_margin: 10
show_legend: true
legend_unit: "°C"
gradient:
  0.0: "#3498db"    # Cool blue
  0.3: "#2ecc71"    # Comfortable green
  0.6: "#f39c12"    # Warm orange
  1.0: "#e74c3c"    # Hot red
points:
  - x: 150
    y: 200
    entity_id: sensor.living_room_temperature
    label: "Living Room"
  - x: 450
    y: 200
    entity_id: sensor.kitchen_temperature
    label: "Kitchen"
  - x: 150
    y: 400
    entity_id: sensor.bedroom_temperature
    label: "Bedroom"
```

### Power Consumption

Visualize power usage across different areas:

```yaml
type: custom:heatmap-card
background: /local/office_layout.svg
min_value: 0
max_value: 2000
show_labels: true
legend_unit: "W"
radius: 60
opacity: 0.7
gradient:
  0.0: "#27ae60"    # Low power - green
  0.3: "#f39c12"    # Medium - orange
  0.7: "#e74c3c"    # High - red
  1.0: "#8e44ad"    # Very high - purple
points:
  - x: 100
    y: 150
    entity_id: sensor.computer_power
    label: "Computer"
  - x: 300
    y: 150
    entity_id: sensor.monitor_power
    label: "Monitors"
  - x: 200
    y: 300
    entity_id: sensor.printer_power
    label: "Printer"
```

### Humidity Monitoring

Track humidity levels with appropriate colors:

```yaml
type: custom:heatmap-card
background: /local/bathroom.jpg
min_value: 20
max_value: 80
show_legend: true
legend_unit: "%"
update_interval: 60
gradient:
  0.0: "#f39c12"    # Too dry - orange
  0.3: "#27ae60"    # Optimal - green
  0.7: "#3498db"    # Humid - blue
  1.0: "#9b59b6"    # Too humid - purple
points:
  - x: 200
    y: 100
    entity_id: sensor.bathroom_humidity
    label: "Bathroom"
  - x: 200
    y: 300
    entity_id: sensor.shower_humidity
    label: "Shower Area"
```

## Tips and Best Practices

### Finding Coordinates

1. **Using an Image Editor**
   - Open your background image in an image editor
   - Use the cursor position to find X,Y coordinates
   - Note that (0,0) is the top-left corner

2. **Using Browser Developer Tools**
   - Add a temporary point at x:0, y:0
   - Use browser inspector to adjust values
   - Watch the heatmap update in real-time

3. **Coordinate Helper Script**
   ```javascript
   // Paste in browser console when viewing the card
   document.querySelector('heatmap-card').addEventListener('click', (e) => {
     const rect = e.target.getBoundingClientRect();
     console.log(`x: ${e.clientX - rect.left}, y: ${e.clientY - rect.top}`);
   });
   ```

### Performance Optimization

1. **Limit Points**: Keep under 50 points for best performance
2. **Update Interval**: Use longer intervals (60+ seconds) for static values
3. **Image Size**: Optimize background images (< 1MB recommended)
4. **Radius**: Smaller radius values render faster

### Color Gradient Design

1. **Temperature**: Blue → Green → Yellow → Red
2. **Humidity**: Orange → Green → Blue
3. **Air Quality**: Green → Yellow → Orange → Red → Purple
4. **Energy**: Green → Yellow → Red
5. **Custom**: Match your Home Assistant theme

### Entity Selection

Good entities for heatmaps:
- Temperature sensors
- Humidity sensors
- Power/energy monitors
- Air quality sensors
- Motion sensors (with appropriate time windows)
- Light levels
- Sound levels

## Common Issues

### Points Not Showing

- Verify entity IDs are correct
- Check entity has numeric state
- Ensure coordinates are within image bounds
- Try increasing radius value

### Performance Issues

- Reduce number of points
- Increase update interval
- Optimize background image size
- Disable labels if not needed

### Visual Issues

- Adjust opacity for better visibility
- Tweak blur for smoother gradients
- Modify radius for coverage
- Use scale_margin for better auto-scaling 