import { DataTable } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines } from "../utils";
import { format as formatTableRows } from "./tableRowFormatter";
import { getDebugger } from '../debug';

const debug = getDebugger("dataTableFormatter");

export function format(dataTable: DataTable, options: Partial<FormatOptions>): string {
    debug("format(dataTable: %s, options: %o)", dataTable.constructor.name, options);
    return lines(options).add(formatTableRows(dataTable.rows)).toString();
}
