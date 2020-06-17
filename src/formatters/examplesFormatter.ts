import { Examples } from "gherkin-ast";
import { FormatOptions } from "../index";
import { indent, lines, table } from "../utils";
import { toArray as rowToArray } from "./tableRowFormatter";
import { format as formatTag } from "./tagFormatter";

export function format(examples: Examples, options: Partial<FormatOptions>): string {
    const l = lines(options);

    if (examples.tags.length > 0) {
        l.add(formatTag(examples.tags, options));
    }
    l.add(indent(`${examples.keyword}: ${examples.name}`));

    const t = table();
    t.push(rowToArray(examples.header));
    examples.body.forEach((row) => {
        t.push(rowToArray(row));
    });
    l.add(indent(t.toString(), 2));

    return l.toString();
}
