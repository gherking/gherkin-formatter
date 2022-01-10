import { TableRow } from "gherkin-ast";
import { getDebugger } from "../debug";
import { table } from "../utils";
import { format as formatTableCell } from "./tableCellFormatter";

const debug = getDebugger("tableRowFormatter");

export function toArray(tableRow: TableRow) {
    return tableRow.cells.map((cell) => formatTableCell(cell));
}

export function format(tableRows: TableRow[]): string {
    debug("format(tableRows: %s)", tableRows?.constructor.name);
    if (!tableRows) {
        throw new Error("TableRows must be set!");
    }
    return table(tableRows.map(toArray));
}
