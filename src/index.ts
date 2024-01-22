import { Document, TagFormat, config as astConfig } from "gherkin-ast";
import { setDefaultOptions } from "lines-builder";
import { getDebugger } from "./debug";
import { format as formatGherkinDocument } from "./formatters/gherkinDocumentFormatter";

const debug = getDebugger("index");

export interface FormatOptions {
    oneTagPerLine?: boolean;
    separateStepGroups?: boolean;
    compact?: boolean;
    lineBreak?: string | null;
    indentation?: string | number;
    tagFormat?: TagFormat;
}

const DEFAULT_OPTIONS: FormatOptions = {
  oneTagPerLine: false,
  separateStepGroups: false,
  compact: false,
  lineBreak: null,
  indentation: "  ",
  tagFormat: TagFormat.FUNCTIONAL,
};

export const config = (options?: Partial<FormatOptions>): FormatOptions => {
  debug("config(options: %o)", options);
  options = options ?? {};
  return {
    oneTagPerLine: options.oneTagPerLine ?? DEFAULT_OPTIONS.oneTagPerLine,
    separateStepGroups: options.separateStepGroups ?? DEFAULT_OPTIONS.separateStepGroups,
    compact: options.compact ?? DEFAULT_OPTIONS.compact,
    lineBreak: options.lineBreak ?? DEFAULT_OPTIONS.lineBreak,
    indentation: options.indentation ?? DEFAULT_OPTIONS.indentation,
    tagFormat: options.tagFormat ?? DEFAULT_OPTIONS.tagFormat,
  };
};

export const format = (document: Document, options?: Partial<FormatOptions>): string => {
  debug("format(document: %s, options: %o)", document?.constructor.name, options);
  if (!document) {
    throw new Error("Document must be set!");
  }
  if (!(document instanceof Document)) {
    throw new TypeError(`The passed object is not a GherkinDocument! ${document}`);
  }
  options = config(options);
  astConfig.set({
    tagFormat: options.tagFormat,
  });
  setDefaultOptions({
    eol: options.lineBreak,
    indent: options.indentation,
    skipEmpty: options.compact,
    skipFirstLevelIndent: true,
    indentEmpty: false,
    trimLeft: false,
    trimRight: true,
  });
  return formatGherkinDocument(document, options);
};
