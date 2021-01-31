import { DocString } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines } from "../utils";

const DOC_STRING_DELIMITER = "\"\"\"";

export function format(docString: DocString, options: Partial<FormatOptions>): string {
    return lines(options).add(DOC_STRING_DELIMITER, docString.content, DOC_STRING_DELIMITER).toString();
}
