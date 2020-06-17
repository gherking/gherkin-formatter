import { Document, GherkinDocument } from "gherkin-ast";
import { format as formatGherkinDocument } from "./formatters/gherkinDocumentFormatter";
declare type Eol = "\n" | "\r\n";

export interface FormatOptions {
    oneTagPerLine?: boolean;
    separateStepGroups?: boolean;
    compact?: boolean;
    lineBreak: Eol;
    indentation: string;
}

export interface Formatter {
    // tslint:disable-next-line:no-any
    format(obj: any, option: FormatOptions): string;
}

/**
 * Converts the given Object to Gherkin Document.
 * @param {Object} document
 * @returns {GherkinDocument}
 */
export const objectToAST = (obj: GherkinDocument): Document => {
    return Document.parse(obj);
};

// tslint:disable-next-line:no-any
export const format = (document: Document, options?: Partial<FormatOptions>): string | any => {
    if (Array.isArray(document)) {
        return document.map((doc) => format(doc, options));
    }
    /* if (!(document instanceof Document)) {
        throw new TypeError(`The passed object is not a GherkinDocument!` + document);
    } */
    return formatGherkinDocument(document, options);
};
