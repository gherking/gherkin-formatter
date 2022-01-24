import { Document } from "gherkin-ast";
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
}

const DEFAULT_OPTIONS: FormatOptions = {
    oneTagPerLine: false,
    separateStepGroups: false,
    compact: false,
    lineBreak: null,
    indentation: "  ",
};

export const config = (options: Partial<FormatOptions>): FormatOptions => {
    debug("config(options: %o)", options);
    return {
        ...DEFAULT_OPTIONS,
        ...(options || {}),
    };
};

// tslint:disable-next-line:no-any
export const format = (document: Document, options?: Partial<FormatOptions>): string | any => {
    debug("format(document: %s, options: %o)", document?.constructor.name, options);
    if (!document) {
        throw new Error("Document must be set!");
    }
    if (!(document instanceof Document)) {
        throw new TypeError(`The passed object is not a GherkinDocument! ${document}`);
    }
    options = config(options);
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
