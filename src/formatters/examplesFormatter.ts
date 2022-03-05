import { Examples, TableRow } from "gherkin-ast";
import { lines } from "lines-builder";
import { getDebugger } from "../debug";
import { FormatOptions } from "../index";
import { format as formatTableRows } from "./tableRowFormatter";
import { format as formatTag } from "./tagFormatter";

const debug = getDebugger("examplesFormatter");

export function format(examples: Examples, options?: Partial<FormatOptions>): string {
    debug("format(examples: %s, options: %o)", examples?.constructor.name, options);
    if (!examples) {
        throw new Error("Examples must be set!");
    }
    const l = lines(`${examples.keyword}: ${examples.name}`);
    if (examples.precedingComment) {
        l.prepend(examples.precedingComment.text);
    }
    if (examples.tags.length > 0) {
        l.prepend(formatTag(examples.tags, options));
    }
    if (examples.tagComment) {
        l.prepend(examples.tagComment.text);
    }
    const tableRows: TableRow[] = [examples.header, ...examples.body];

    l.append(lines(formatTableRows(tableRows)));

    return l.toString();
}
