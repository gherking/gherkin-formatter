import { DocString } from "gherkin-ast";
import { getDebugger } from "../debug";
import { FormatOptions } from "../index";
import { lines } from "../utils";

const debug = getDebugger("docStringFormatter");
const DOC_STRING_DELIMITER = "\"\"\"";

export function format(docString: DocString, options?: Partial<FormatOptions>): string {
    debug("format(docString: %s, options: %o)", docString?.constructor.name, options);
    if (!docString) {
        throw new Error("DocString must be set!");
    }
    return lines(options).add(DOC_STRING_DELIMITER, docString.content, DOC_STRING_DELIMITER).toString();
}
