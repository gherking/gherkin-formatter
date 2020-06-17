import { TableRow } from "gherkin-ast";
import { table } from "../utils";
import { format as formatTableCell } from "./TableCellFormatter";

export function toArray(tableRow: TableRow) {
    return tableRow.cells.map((cell) => formatTableCell(cell));
}

export function format(tableRow: TableRow): string {
    const t = table();
    t.push(toArray(tableRow));
    return t.toString();
}
