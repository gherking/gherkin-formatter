import { TableCell } from "gherkin-ast";


export class TableCellFormatter {
    public static format(tableCell: TableCell): string {
        return tableCell.value;
    }
}