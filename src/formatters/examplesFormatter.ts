import { Examples } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines, indent, table } from "../utils";
import { TagFormatter } from './tagFormatter';
import { TableRowFormatter } from './tableRowFormatter';

export class ExamplesFormatter {
    public static format(examples: Examples, options: Partial<FormatOptions>): string {
        const l = lines(options);

        if (examples.tags.length > 0) {
            l.add(TagFormatter.format(examples.tags, options));
        }
        l.add(indent(`${examples.keyword}: ${this.name}`));

        const t = table();
        t.push(TableRowFormatter.toArray(examples.header));
        examples.body.forEach(row => {
            t.push(TableRowFormatter.toArray(row));
        });
        l.add(indent(t.toString(), 2));

        return l.toString();
    }
}