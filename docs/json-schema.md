# JSON-Schema

A JSON schema defines the structure of one entry in the JSON data file.
In general, it follows the rules of the [JSON Schema definition](http://json-schema.org/JSON-Schemaa.md) but with some
additional features (And some features of JSON Schema are not supported).

## Root object

One important aspect is that a schema file in this tool starts with a different structure:

```text
{
  "title": "Title of the file",
  "schema": {
      <-- the actual schema is placed here 
  }
}
```

In the root object of the schema file, you can configure the following fields:

| Key    | Description
| ------ | -----------
| title  | The file title (is displayed in the navigation)
| schema | The actual JSON schema
| ...    | (Anything else is ignored by this tool)

## The schema

Here's an example of a full schema:

```json
{
  "title": "Characters",
  "schema": {
    "title": "Character",
    "type": "object",
    "properties": {
      "id": {
        "title": "ID",
        "type": "string"
      },
      "name": {
        "title": "Name",
        "type": "string"
      },
      "gender": {
        "title": "Gender",
        "type": "string",
        "enum": [
          "male",
          "female"
        ]
      },
      "hitpoints": {
        "title": "Hit Points",
        "type": "integer"
      },
      "skills": {
        "title": "Skills",
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    },
    "required": ["id"]
  }
}
```

> Note: **title** is always optional. By default, this tool shows the field names as title. 

Each property in the schema must have a **type** (e.g. `string`, `integer`, `number`, `boolean`, `object`, `array`).
Depending on the type you can also have additional configurations. See
[examples of each type here](https://spacetelescope.github.io/understanding-json-schema/reference/type.html). 

