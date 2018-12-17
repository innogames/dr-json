# Use an enum as an autocomplete suggestion list

It is possible to have an enum that can be used as an autocomplete suggestion list.
The list will be available for you to search and select from, similar to the normal enums.
However unlike regular enums, you can create/add your own entries and select them even though they're not in the list.

To define the autocomplete field in your schema, use the custom field "dj:autocomplete" as follows:

```json
{
    "dj:autocomplete": {
      "title": "Origin",
        "type": "string",
        "enum": [
          "Lothlorien",
          "Dale",
          "Gondor",
          "Rohan",
          "Mordor"
        ]
    }
}
```

The autocomplete field also supports "**$ref**" references to other files where you can define your enums.

You can see the examples of "**dj:autcomplete**" and "**$ref** usage in the following example files:
- The json schema ("heroNames.schema.json") where the "dj:autocomplete" is defined.
- The referenced enum ("./_types/origins.json")
