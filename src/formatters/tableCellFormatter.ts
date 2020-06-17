import { TableCell } from "gherkin-ast";

export function format(tableCell: TableCell): string {
    return tableCell.value;
}