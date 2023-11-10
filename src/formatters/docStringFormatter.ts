import { DocString } from "gherkin-ast";
import { lines } from "lines-builder";
import { getDebugger } from "../debug";

const debug = getDebugger("docStringFormatter");

export function format(docString: DocString): string {
  debug("format(docString: %s)", docString?.constructor.name);
  if (!docString) {
    throw new Error("DocString must be set!");
  }
  const l = lines(docString.content, docString.delimiter);
  if (docString.mediaType) {
    l.prepend(docString.delimiter + docString.mediaType);
  } else {
    l.prepend(docString.delimiter);
  }
  if (docString.comment) {
    l.prepend(docString.comment.text);
  }
  return l.toString();
}
