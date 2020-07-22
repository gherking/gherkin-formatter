import { TableRow } from "gherkin-ast";
import { table } from "../utils";
import { format as formatTableCell } from "./TableCellFormatter";

export function toArray(tableRow: TableRow) {
    return tableRow.cells.map((cell) => formatTableCell(cell));
}

export function format(tableRows: TableRow[]): string {
    const t = table();
    tableRows.forEach((row) => {
        t.push(toArray(row));
    });
    return t.toString();
}
