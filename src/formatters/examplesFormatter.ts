import { Examples, TableRow } from "gherkin-ast";
import { FormatOptions } from "../index";
import { indent, lines } from "../utils";
import { format as formatTableRows } from "./tableRowFormatter";
import { format as formatTag } from "./tagFormatter";

export function format(examples: Examples, options: Partial<FormatOptions>): string {
    const l = lines(options);

    if (examples.tags.length > 0) {
        l.add(formatTag(examples.tags, options));
    }
    l.add(indent(`${examples.keyword}: ${examples.name}`));

    const tableRows: TableRow[] = [examples.header, ...examples.body];

    l.add(indent(formatTableRows(tableRows), 2));

    return l.toString();
}
