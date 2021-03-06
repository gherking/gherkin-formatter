import { Document } from "gherkin-ast";
import { getDebugger } from "./debug";
import { format as formatGherkinDocument } from "./formatters/gherkinDocumentFormatter";
declare type Eol = "\n" | "\r\n";

const debug = getDebugger("index");

export interface FormatOptions {
    oneTagPerLine?: boolean;
    separateStepGroups?: boolean;
    compact?: boolean;
    lineBreak: Eol;
    indentation: string;
}

// tslint:disable-next-line:no-any
export const format = (document: Document, options?: Partial<FormatOptions>): string | any => {
    debug("format(document: %s, options: %o )", document?.constructor.name, options);
    if (!document) {
        throw new Error("Document must be set!");
    }
    if (!(document instanceof Document)) {
        throw new TypeError(`The passed object is not a GherkinDocument! ${document}`);
    }
    return formatGherkinDocument(document, options);
};
