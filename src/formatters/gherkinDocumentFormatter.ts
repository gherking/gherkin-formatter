import { Document } from "gherkin-ast";
import { FormatOptions } from "../index";
import { format as formatFeature } from "./featureFormatter";
import { getDebugger } from '../debug';

const debug = getDebugger("gherkinDocumentFormatter");

export function format(document: Document, options: Partial<FormatOptions>): string {
    debug("format(document: %s, options: %o)", document.constructor.name, options);
    return formatFeature(document.feature, options);
}
