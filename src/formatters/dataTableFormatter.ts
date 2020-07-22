import { DataTable } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines } from "../utils";
import { format as formatTableRows } from "./tableRowFormatter";

export function format(dataTable: DataTable, options: Partial<FormatOptions>): string {
    const l = lines(options);
    l.add(formatTableRows(dataTable.rows));
    return l.toString();
}
