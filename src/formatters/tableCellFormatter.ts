import { TableCell } from "gherkin-ast";
import { getDebugger } from '../debug';

const debug = getDebugger("tableCellFormatter");

export function format(tableCell: TableCell): string {
    debug("format(tableCell: %s)", tableCell?.constructor.name);
    return tableCell.value;
}