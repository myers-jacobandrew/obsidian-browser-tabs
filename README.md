# Obsidian Browser Tabs

This is a community plugin for the [Obsidian](https://obsidian.md/) note-taking app that enables browser-like tabs for workspace leafs.

## Features

-   Create and manage named tab groups with different colors
-   Add/remove workspace leafs to/from tab groups
-   Persist tab group data across Obsidian sessions
-   Automatically link leafs to existing tab groups based on their ephemeral state

## Usage

To use this plugin, you can install it from within Obsidian by going to **Settings > Third-party plugins** and searching for "Browser Tabs". You can also download the latest release from the [GitHub repository](https://github.com/myers-jacobandrew/obsidian-browser-tabs) and manually install it by placing the `main.js` and `manifest.json` files in your Obsidian plugins folder.

Once the plugin is installed and enabled, you can create tab groups from the command palette (`Ctrl/Cmd + P`), or by right-clicking on a workspace leaf and selecting **Add to tab group** from the context menu. You can also remove a leaf from a tab group by selecting **Remove from tab group** from the context menu.

By default, tab groups will be persisted across Obsidian sessions, so you can reopen a previous set of tabs by restoring a saved workspace layout. If you prefer to start with a clean slate each time you open Obsidian, you can disable the "Remember tabs across sessions" setting from the plugin's settings.

## Development

If you want to contribute to the development of this plugin, you can clone the GitHub repository and build it locally by running:

`npm install npm run build`

This will create a `main.js` file in the `dist/` folder that you can use for testing or debugging. To watch for changes and rebuild the plugin automatically, you can run:

`npm run dev`


This plugin was originally developed by Jake Myers