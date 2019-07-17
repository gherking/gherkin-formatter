import { Document } from "gherkin-ast";
declare type Eol = "\n" | "\r\n";

export interface FormatOptions {
    oneTagPerLine?: boolean;
    separateStepGroups?: boolean;
    compact?: boolean;
    lineBreak: Eol;
    indentation: string;
}

export const format = (document: Document, options?: Partial<FormatOptions>): string => {
    return JSON.stringify({ document, options });
};
