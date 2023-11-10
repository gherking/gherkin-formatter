import { Document } from "gherkin-ast";
import { lines } from "lines-builder";
import { getDebugger } from "../debug";
import { FormatOptions } from "../index";
import { format as formatFeature } from "./featureFormatter";

const debug = getDebugger("gherkinDocumentFormatter");

export function format(document: Document, options?: Partial<FormatOptions>): string {
  debug("format(document: %s, options: %o)", document?.constructor.name, options);
  if (!document) {
    throw new Error("Document must be set!");
  }
  const l = lines(formatFeature(document.feature, options));
  if (document.startComment) {
    l.prepend(document.startComment.text, null);
  }
  if (document.endComment) {
    l.append(null, document.endComment.text);
  }
  return l.toString();
}
