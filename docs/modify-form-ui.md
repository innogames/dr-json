# Modify Form UI

Dr. Json automatically generates forms based on the JSON Schema. But you can also control how single form fields
are rendered by specifying a `ui:widget`:

```json
{
  "name": {
    "type": "string",
    "ui:widget": "textarea"
  }
}
```

In this example a textarea is rendered instead of a text input.

Here's a list of some possible UI widgets:

| type           | ui:widget | description
| -------------- | --------- | -----------
| bool           | radio     | renders radio input with `true` and `false` instead of checkbox
| bool           | select    | renders select input with `true` and `false` instead of checkbox
| string         | textarea  | renders textarea instead of text input
| number/integer | updown    | renders input with type=number
| number/integer | range     | renders a slider
| number/integer | radio     | renders radio buttons (only when enum is used)

See more information [here](https://github.com/mozilla-services/react-jsonschema-form#the-uischema-object).

You can also add some hints and descriptions for form elements:

```json
{
  "name": {
    "type": "string",
    "ui:description": "A description below the title",
    "ui:help": "A hint below the form field",
    "ui:placeholder": "Placeholder in form field"
  }
}
```

## Multiple choices list

If you want to have a multiple choice list with checkboxes, you can do this:

```json
{
  "someValue": {
    "type": "array",
    "items": {
      "type": "string",
      "enum": ["one", "two", "three"]
    },
    "uniqueItems": true,
    "ui:widget": "checkboxes"
  }
}
```
