import { DataTable } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines, table } from "../utils";
import { toArray as rowToArray } from "./tableRowFormatter";

export function format(dataTable: DataTable, options: Partial<FormatOptions>): string {
    const t = table();
    dataTable.rows.forEach((row) => {
        t.push(rowToArray(row));
    });
    const l = lines(options);
    l.add(t.toString());
    return l.toString();
}
