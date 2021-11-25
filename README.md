# gherkin-formatter

![Downloads](https://img.shields.io/npm/dw/gherkin-formatter?style=flat-square)
![Version@npm](https://img.shields.io/npm/v/gherkin-formatter?label=version%40npm&style=flat-square)
![Version@git](https://img.shields.io/github/package-json/v/gherking/gherkin-formatter/master?label=version%40git&style=flat-square)
![CI](https://img.shields.io/github/workflow/status/gherking/gherkin-formatter/CI/master?label=ci&style=flat-square)
![Docs](https://img.shields.io/github/workflow/status/gherking/gherkin-formatter/Docs/master?label=docs&style=flat-square)

Tool to format gherkin-ast model to gherkin string

# Usage

The format function of this package provides a formatted string (gherkin document) from your [AST](https://github.com/gherking/gherkin-ast).

## TypeScript

```typescript
import { format, FormatOptions } from "gherkin-formatter";
import { Document } from "gherkin-ast";
import { load } from "gherkin-io";

const document: Document = load("./test.feature");
const options: FormatOptions = { separateStepGroups: false };
console.log(format(document, options));
// Feature: Test Feature
//
//   As a user...
```

## JavaScript

```javascript
const { format, FormatOptions } = require("gherkin-formatter");
const { Document } = require("gherkin-ast");
const { load } = require("gherkin-io");

const document = load("./test.feature");
const options = { separateStepGroups: false };
console.log(format(document, options));
// Feature: Test Feature
//
//   As a user...
```

## CLI

```
npx gherkin-formatter './path/to/*.feature'
```

### Configuration - `FormatConfig`

By passing an `FormatConfig` object to format method (or other Ast type methods where it's applicable) it can be set, how feature file text is rendered.

| Option               | Description                                             | Default                                                                             |
| :------------------- | :------------------------------------------------------ | :---------------------------------------------------------------------------------- |
| `oneTagPerLine`      | Should tags rendered separately, one by line?           | `false`, i.e. all tag of a scenario, feature, etc will be rendered in the same line |
| `separateStepGroups` | Should step groups (when-then) be separated?            | `false`                                                                             |
| `compact`            | Should empty lines be skipped, removed from the result? | `false`, i.e. there will be empty lines in appropriate places                       |
| `lineBreak`          | The line break character(s).                            | `\n`, i.e. it uses Unix line break, to set Windows style, set `\r\n`                |
| `indentation`        | The indentation character(s).                           | `' '`, i.e. it uses two space character to add indentation where it's appropriate   |

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gherkin-formatter/).
