import { DocString } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines } from "../utils";
import { getDebugger } from '../debug';

const debug = getDebugger("docStringFormatter");
const DOC_STRING_DELIMITER = "\"\"\"";

export function format(docString: DocString, options: Partial<FormatOptions>): string {
    debug("format(docString: %s, options: %o)", docString?.constructor.name, options);
    return lines(options).add(DOC_STRING_DELIMITER, docString.content, DOC_STRING_DELIMITER).toString();
}
