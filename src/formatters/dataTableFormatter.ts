import { DataTable } from "gherkin-ast";
import { lines } from "lines-builder";
import { getDebugger } from "../debug";
import { format as formatTableRows } from "./tableRowFormatter";

const debug = getDebugger("dataTableFormatter");

export function format(dataTable: DataTable): string {
    debug("format(dataTable: %s)", dataTable?.constructor.name);
    if (!dataTable) {
        throw new Error("DataTable must be set!");
    }
    return lines(formatTableRows(dataTable.rows)).toString();
}
