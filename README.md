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

<!-- == import: change-log / begin from: ./CHANGELOG.md#3~ == -->

## v0.0.6, v0.0.5, v0.0.4

Fixed some annoying behaviours.

- `importer update` and `importer purge` commands to save the file before executing the Importer commands.
- Importer Markers will be added as "insert"
- Exporter Markers will be added as "wrapped", with some line selection fix

## v0.0.3 - Initial Release

> 8th November, 2021

Initial release with minimal code and testing. This release adds the following commands.

- `importer update` on the open file
- `importer purge` on the open file
- Add Importer and Exporter snippets (`imptr` and `exptr` as a trigger)
- Wrap selected lines with Importer or Exporter Markers

### v0.0.2, v0.0.1

> 8th November, 2021

Critical bugs were found, which made the extension to be essentially unusable. Please do not use this version.

<!-- == import: change-log / end == -->
