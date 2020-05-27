import { TableRow } from "gherkin-ast";
import { table } from "../utils";
import { TableCellFormatter } from './TableCellFormatter';

export class TableRowFormatter {

    public static toArray(tableRow: TableRow) {
        return tableRow.cells.map(cell => TableCellFormatter.format(cell));
    }

    public static format(tableRow: TableRow): string {
        const t = table();
        t.push(this.toArray(tableRow));
        return t.toString();
    }
}