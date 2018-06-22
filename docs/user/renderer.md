# Change how data is rendered

You can change the way how the data is displayed in Dr. Json. This is useful if you want to display an array as
bullet points for instance. You can change it by specifying `dj:renderer` for a type in the schema. E.g.

```
{
  "title": "Hero Names",
  "schema": {
    "title": "Hero Names",
    "type": "object",
    "properties": {
      "id": {
        "title": "Race",
        "type": "string"
      },
      "names": {
        "type": "array",
        "dj:renderer": "list",        <--- see here
        "items": {
          "type": "string"
        }
      }
    },
    "required": [
      "id",
      "names"
    ]
  }
}

```

Now the names are displayed as bullet point list.


## Available Renderers

| Renderer     | Description
| ------------ | -----------
| array        | **(Default for arrays)** Uses `arrayOneline` renderer when values are simple values. Otherwise it uses `arrayRows`.
| arrayOneline | Renders comma separated list in one line.
| arrayRows    | Renders one row per value including the path of the current element as hint.
| bool         | **(Default for bool values)** Renders Yes or No.
| number       | **(Default for numbers)** Renders the number.
| object       | **(Default for objects)** Renders a table with the property name and values.
| string       | **(Default for strings)** Renders a simple string.
| null         | **(Default for null)** Renders nothing
| list         | Renders a bullet point list.