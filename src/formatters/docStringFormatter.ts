import { DocString } from "gherkin-ast";
import { lines } from "lines-builder";
import { getDebugger } from "../debug";

const debug = getDebugger("docStringFormatter");
const DOC_STRING_DELIMITER = "\"\"\"";

export function format(docString: DocString): string {
    debug("format(docString: %s)", docString?.constructor.name);
    if (!docString) {
        throw new Error("DocString must be set!");
    }
    return lines(DOC_STRING_DELIMITER, docString.content, DOC_STRING_DELIMITER).toString();
}
