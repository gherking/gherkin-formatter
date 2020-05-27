import { DataTable } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines, table } from "../utils";
import { TableRowFormatter } from './tableRowFormatter';

export class DataTableFormatter {
    public static format(dataTable: DataTable, options: Partial<FormatOptions>): string {
        const t = table();
        dataTable.rows.forEach(row => {
            t.push(TableRowFormatter.toArray(row));
        });
        const l = lines(options);
        l.add(t.toString());
        return l.toString();
    }
}