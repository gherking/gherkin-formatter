import { TableCell } from "gherkin-ast";
import { getDebugger } from "../debug";

const debug = getDebugger("tableCellFormatter");

export function format(tableCell: TableCell): string {
  debug("format(tableCell: %s)", tableCell?.constructor.name);
  if (!tableCell) {
    throw new Error("TableCell must be set!");
  }
  return tableCell.value;
}
