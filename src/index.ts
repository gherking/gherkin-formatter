import { Document } from "gherkin-ast";
import { format as formatGherkinDocument } from "./formatters/gherkinDocumentFormatter";
import { getDebugger } from './debug';
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
    debug("format(document: %s, options: %o )", document.constructor.name, options);
    if (!(document instanceof Document)) {
        throw new TypeError(`The passed object is not a GherkinDocument!` + document);
    }
    return formatGherkinDocument(document, options);
};
