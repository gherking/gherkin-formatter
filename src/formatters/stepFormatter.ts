import { Step } from "gherkin-ast";
import { getDebugger } from "../debug";
import { FormatOptions } from "../index";
import { indent, lines } from "../utils";
import { format as formatDataTable } from "./dataTableFormatter";
import { format as formatDocString } from "./docStringFormatter";

const debug = getDebugger("stepFormatter");

export function format(step: Step, options?: Partial<FormatOptions>): string {
    debug("format(step: %s, options: %o)", step?.constructor.name, options);
    if (!step) {
        throw new Error("Step must be set!");
    }
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
