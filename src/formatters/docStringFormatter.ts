import { DocString } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines } from "../utils";

export function format(docString: DocString, options: Partial<FormatOptions>): string {
    const l = lines(options);
    l.add('"""', docString.content, '"""');
    return l.toString();
}
