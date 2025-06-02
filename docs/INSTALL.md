# Installation Guide

## Prerequisites

- Home Assistant 2021.12 or later
- Access to your Home Assistant configuration files
- Basic knowledge of YAML configuration

## Installation Methods

### Method 1: HACS (Recommended)

1. **Ensure HACS is installed**
   - If you don't have HACS, follow the installation guide at https://hacs.xyz/

2. **Add Custom Repository**
   - Open HACS in your Home Assistant instance
   - Go to "Frontend" section
   - Click the three dots menu in the top right
   - Select "Custom repositories"
   - Add the repository URL: `https://github.com/yourusername/heatmap-card`
   - Select "Lovelace" as the category
   - Click "Add"

3. **Install the Card**
   - Find "Heatmap Card" in the HACS store
   - Click on it and then click "Install"
   - Restart Home Assistant

### Method 2: Manual Installation

1. **Download the Files**
   - Download `heatmap-card.js` from the [latest release](https://github.com/yourusername/heatmap-card/releases)
   - Create a `www` folder in your config directory if it doesn't exist

2. **Copy Files**
   ```bash
   # From your Home Assistant config directory
   mkdir -p www/heatmap-card
   cp /path/to/downloaded/heatmap-card.js www/heatmap-card/
   ```

3. **Add Resource**
   
   **Option A: Via UI (Recommended)**
   - Go to Configuration → Lovelace Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/heatmap-card/heatmap-card.js`
   - Resource type: JavaScript Module
   - Click "Create"

   **Option B: Via YAML**
   - Edit your `configuration.yaml`
   ```yaml
   lovelace:
     mode: yaml
     resources:
       - url: /local/heatmap-card/heatmap-card.js
         type: module
   ```

4. **Restart Home Assistant**

## Verification

To verify the installation:

1. Go to any Lovelace dashboard
2. Enter edit mode
3. Click "Add Card"
4. Search for "Heatmap Card"
5. If it appears in the list, installation was successful

## Troubleshooting

### Card Not Appearing

1. **Clear Browser Cache**
   - Press Ctrl+F5 (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or open Developer Tools → Network → Disable cache

2. **Check Console Errors**
   - Open browser Developer Tools (F12)
   - Check Console tab for errors
   - Look for messages about loading heatmap-card.js

3. **Verify File Path**
   - Ensure the file is in the correct location
   - Check that the resource URL matches the file location

### Resource Not Found

- Double-check the file path
- Ensure you've restarted Home Assistant after adding the resource
- Try using the full path: `/hacsfiles/heatmap-card/heatmap-card.js` for HACS installations

### Module Import Errors

- Ensure you're using a modern browser (Chrome 88+, Firefox 85+, Safari 14+)
- Check that the resource type is set to "module" not "js"

## Next Steps

Once installed, proceed to the [Configuration Guide](CONFIGURATION.md) to set up your first heatmap! 