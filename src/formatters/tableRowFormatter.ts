import { TableRow } from "gherkin-ast";
import { lines, splitToLines } from "lines-builder";
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
  const tableLines = splitToLines(table(tableRows.map(toArray)));
  const result = lines();
  for (let i = 0; i < tableRows.length; ++i) {
    const row = tableRows[i];
    if (row.comment) {
      result.append(row.comment.text);
    }
    result.append(tableLines[i]);
  }
  return result.toString();
}
