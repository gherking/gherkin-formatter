# gherkin-formatter

[![Build Status](https://travis-ci.org/gherking/gherkin-formatter.svg?branch=master)](https://travis-ci.org/gherking/gherkin-formatter) [![dependency Status](https://david-dm.org/gherking/gherkin-formatter.svg)](https://david-dm.org/gherking/gherkin-formatter) [![devDependency Status](https://david-dm.org/gherking/gherkin-formatter/dev-status.svg)](https://david-dm.org/gherking/gherkin-formatter#info=devDependencies)

Tool to format gherkin-ast model to gherkin string

## Usage

The format function of this package provides a formatted string (gherkin document) from your [AST](https://github.com/gherking/gherkin-ast).

In TypeScript
```typescript
import {format, FormatOptions} from "gherkin-formatter";
import {Document} from "gherkin-ast";
import {load} from "gherkin-io";

const document: Document = load("./test.feature");
const options: FormatOptions = {separateStepGroups : false};
console.log(format(document, options));
// Feature: Test Feature
//
//   As a user...
```

In JavaScript
```javascript
const {format, FormatOptions} = require("gherkin-formatter");
const {Document} = require("gherkin-ast");
const {load} = require("gherkin-io");

const document = load("./test.feature");
const options = {separateStepGroups : false};
console.log(format(document, options));
// Feature: Test Feature
//
//   As a user...
```
### Configuration - `FormatConfig`

By passing an `FormatConfig` object to format method (or other Ast type methods where it's applicable) it can be set, how feature file text is rendered.

| Option | Description | Default |
|:-------|:------------|:--------|
| `oneTagPerLine` | Should tags rendered separately, one by line? | `false`, i.e. all tag of a scenario, feature, etc will be rendered in the same line |
| `separateStepGroups` | Should step groups (when-then) be separated? | `false` |
| `compact` | Should empty lines be skipped, removed from the result? | `false`, i.e. there will be empty lines in appropriate places |
| `lineBreak` | The line break character(s). | `\n`, i.e. it uses Unix line break, to set Windows style, set `\r\n` |
| `indentation` | The indentation character(s). | `'  '`, i.e. it uses two space character to add indentation where it's appropriate | 

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gherkin-formatter/).
