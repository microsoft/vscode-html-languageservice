# Custom Data for HTML Language Service

In VS Code, there are two ways of loading custom HTML datasets:

1. With setting `html.experimental.customData`
2. With an extension that contributes `contributes.html.experimental.customData`

Both setting point to a list of JSON files. This document describes the shape of the JSON files.

## Custom Data Format

🚧 The data format is in experimental phase and subject to change. 🚧

The JSON can have 3 top level properties:

```jsonc
{
  "tags": [],
  "globalAttributes": [],
  "valueSets": []
}
```

You can find their shapes at [htmlLanguageTypes.ts](../src/htmlLanguageTypes.ts).

[html5.ts](../src/languageFacts/data/html5.ts) contains that built-in dataset that conforms to the spec.

## Language Features

Custom data receives the following language features:

- Completion on tag, attirbute and attribute value
- Hover on tag (here's the [issue](https://github.com/Microsoft/vscode-html-languageservice/issues/47) for hover on attribute / attribute-name)

For example, for the following custom data:

```json
{
  "tags": [
    {
      "name": "foo",
      "description": "The foo element",
      "attributes": [
        { "name": "bar" },
        {
          "name": "baz",
          "values": [
            {
              "name": "baz-val-1"
            }
          ]
        }
      ]
    }
  ],
  "globalAttributes": [
    { "name": "fooAttr", "description": "Foo Attribute" },
    { "name": "xattr", "description": "X attributes", "valueSet": "x" }
  ],
  "valueSets": {
    "x": [
      {
        "name": "xval",
        "description": "x value"
      }
    ]
  }
}
```

- Completion on `<|` will provide `foo`
- Completion on `<foo |` will provide `bar` and `baz`
- Completion on `<foo baz=|` will provide `baz-val-1`
- Completion on `<foo |` will also provide the global attributes `fooAttr` and `xattr`
- Completion on `<foo xattr=>` will provide all values in valueSet `x`, which is `xval`
- Hover on `foo` will show `The foo element`