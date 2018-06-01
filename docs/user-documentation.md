# User documentation

In order to use Dr. Json you need basically three things:
- A Dr. Json [project file](./user/project-file.md) (`dr.json`)
- A folder containing all your JSON data files
- A folder containing a [JSON Schema](./user/json-schema.md) per JSON file

> A real example is worth a thousand words. You can find an [example project here](../example).
> Just download the files and open the example project with your downloaded Dr. Json app.

The folder structure of JSON Schemas should match with the folder structure of the JSON data files:

```text
your-project
  ├─ dr.json                    ← That's the project file
  ├─ schemas/                   ← All JSON Schemas are located here
  │    ├─ weapons.schema.json   ← Schema for weapons.json file
  │    └─ armors.schema.json
  │
  └─ data/                      ← All JSON data file are located here
       ├─ weapons.json
       └─ armors.json
```

Further reading:
- [The project file](./user/project-file.md)
- [JSON Schemas](./user/json-schema.md)
- [Split up JSON Schemas](./user/split-up-schema.md)
- [File variants](./user/file-variants.md)
- [How to modify the form UI](./user/modify-form-ui.md)
