# Project file

If you open Dr. Json the first time, you need to select a project file.
This file, called **dr.json**, contains configurations for your project.
This means, you need to create the dr.json file first:

```json
{
  "name": "My Project"
}
```

Only the `name` property is required. But you can configure more: 

| Property       | Description
| -------------- | -----------
| `name`         | Your project name.
| `minVersion`   | The minimum version of Dr. Json your project requires. You can use this to enforce users to use the latest version of Dr. Json.
| `directories`  | Locations of your JSON files (See more details under _Directories_ below.
| `variantTypes` | See [File Variants](./file-variants.md).

## Directories

You can configure the locations of your JSON files if you want to have your own folder structure:

```json
{
  "name": "My Project",
  "directories": {
    "schemas": "mySchemasDir",
    "data": "myDataDir",
    "variantData": "myVariantDataDir"
  }
}
```

All locations are relative to your project file.

| Directory     | Default value | Description
| ------------- | ------------- | -----------
| `schemas`     | "schemas"     | Contains all JSON Schema files. Each schema file must have the extension `.schema.json`.
| `data`        | "data"        | Contains all JSON data stored based on the related schema. A data file has the same filename as its schema but with the extension `.json`.
| `variantData` | "variantData" | Contains the different variants for the data files. See [File Variants](./file-variants.md).
