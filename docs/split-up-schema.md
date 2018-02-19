# Split up your JSON Schema

It is possible to reuse parts of your schema by splitting them up into different files.
Let's say you have an enum field with a bigger list and you don't want to define this list in each schema.
You can create a separate file:

schema/months.json:
```json
{
  "title": "Month",
  "type": "string",
  "enum": [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Juli",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}
```

> Note that this file should NOT have the extension `.schema.json`. Otherwise it would appear in the navigation.

Now use it in schema files like this:

```json
{
  "title": "Events",
  "schema": {
    "title": "Event",
    "type": "object",
    "properties": {
      "id": {
        "title": "ID",
        "type": "string"
      },
      "fromMonth": {
        "$ref": "months.json",
        "title": "From"
      },
      "toMonth": {
        "$ref": "./months.json",
        "title": "To"
      }
    },
    "required": ["id"]
  }
}
```

You can see two examples of **$ref**.
The first one ("months.json") defines a path relative to the schema folder.
The second one ("./months.json") defines a path relative to the current file.
