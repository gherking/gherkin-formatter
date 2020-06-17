import { Step } from "gherkin-ast";
import { FormatOptions } from "../index";
import { indent, lines } from "../utils";
import { format as formatDataTable } from "./dataTableFormatter";
import { format as formatDocString } from "./docStringFormatter";


export function format(step: Step, options: Partial<FormatOptions>): string {
    const l = lines(options);
    l.add(`${step.keyword} ${step.text}`);
    if (step.docString) {
        l.add(indent(formatDocString(step.docString, options)));
    }
    if (step.dataTable) {
        l.add(indent(formatDataTable(step.dataTable, options)));
    }
    return l.toString();
}
