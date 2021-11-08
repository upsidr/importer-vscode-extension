# Importer Extension for Visual Studio Code

> NOTE: This extension is still in its early days, and active development is taking place. If you find any issues with the extension, please file an issue in this repository!

## 🧤 Requirements

You need to have [Importer](https://github.com/upsidr/importer) installed, and is executable from VS Code extension.

## 🎁 Features

The below is the current list of supported actions.

- `importer update` on the open file
- `importer purge` on the open file
- Add Importer and Exporter snippets (`imptr` and `exptr` as a trigger)
- Wrap selected lines with Importer or Exporter Markers

## 🌥 Known Issues

- Importer not made available in `PATH` would cause command not found error
- More to be added...

## 📝 Release Notes

### v0.0.2 - Initial Release, with activation fix

> 8th November, 2021

Fix the startup event handling to ensure command can be run correctly.

### v0.0.1 - Initial Release

> 8th November, 2021

The very first release with minimal implementation.
