# gherkin-formatter

![Downloads](https://img.shields.io/npm/dw/gherkin-formatter?style=flat-square) ![Version@npm](https://img.shields.io/npm/v/gherkin-formatter?label=version%40npm&style=flat-square) ![Version@git](https://img.shields.io/github/package-json/v/gherking/gherkin-formatter/master?label=version%40git&style=flat-square) ![CI](https://img.shields.io/github/workflow/status/gherking/gherkin-formatter/CI/master?label=ci&style=flat-square) ![Docs](https://img.shields.io/github/workflow/status/gherking/gherkin-formatter/Docs/master?label=docs&style=flat-square)

Tool to format gherkin-ast model to gherkin string

## Usage

The format function of this package provides a formatted string (gherkin document) from your [AST](https://github.com/gherking/gherkin-ast).

In TypeScript

```typescript
import {format, FormatOptions} from "gherkin-formatter";
import {Document} from "gherkin-ast";
import {read} from "gherkin-io";

const document: Document[] = await read("./test.feature");
const options: FormatOptions = {separateStepGroups : false};
console.log(format(document[0], options));
// Feature: Test Feature
//
//   As a user...
```

In JavaScript

```javascript
const {format, FormatOptions} = require("gherkin-formatter");
const {Document} = require("gherkin-ast");
const {read} = require("gherkin-io");

const document = await read("./test.feature");
const options = {
    separateStepGroups: false
};
console.log(format(document[0], options));
// Feature: Test Feature
//
//   As a user...
```

### Configuration - `FormatConfig`

Passing a `FormatConfig` object to format method (or other Ast type methods where it's applicable), how feature file text is rendered can be set.

| Option | Description | Default |
|:-------|:------------|:--------|
| `oneTagPerLine` | Should the tags be rendered separately, one by line? | `false`, i.e., all tags of a scenario, feature, etc. will be rendered in the same line |
| `separateStepGroups` | Should step groups (when-then) be separated? | `false` |
| `compact` | Should empty lines be skipped, removed from the result? | `false`, i.e., there will be empty lines in appropriate places |
| `lineBreak` | The line break character(s). | `null`, i.e., it will determine the line-break based on the platform |
| `indentation` | The indentation character(s). | `'  '`, i.e., it uses two space characters to add indentation where it's appropriate | 

## Other

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gherkin-formatter/).

This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `gherkin-formatter` to see debug logs:

```shell
DEBUG=gherkin-formatter* node my-script.js
```
