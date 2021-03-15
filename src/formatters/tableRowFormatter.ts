import { TableRow } from "gherkin-ast";
import { table } from "../utils";
import { format as formatTableCell } from "./TableCellFormatter";
import { getDebugger } from '../debug';

const debug = getDebugger("tableRowFormatter");

export function toArray(tableRow: TableRow) {
    return tableRow.cells.map((cell) => formatTableCell(cell));
}

export function format(tableRows: TableRow[]): string {
    debug("format(tableRows: %s)", tableRows.constructor.name);
    const t = table();
    tableRows.forEach((row) => {
        t.push(toArray(row));
    });
    return t.toString();
}
