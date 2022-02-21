import { Step } from "gherkin-ast";
import { lines } from "lines-builder";
import { getDebugger } from "../debug";
import { format as formatDataTable } from "./dataTableFormatter";
import { format as formatDocString } from "./docStringFormatter";

const debug = getDebugger("stepFormatter");

export function format(step: Step): string {
    debug("format(step: %s)", step?.constructor.name);
    if (!step) {
        throw new Error("Step must be set!");
    }
    const l = lines(`${step.keyword} ${step.text}`);
    if (step.comment) {
        l.prepend(step.comment.text);
    }
    if (step.docString) {
        l.append(lines(formatDocString(step.docString)));
    }
    if (step.dataTable) {
        l.append(lines(formatDataTable(step.dataTable)));
    }
    return l.toString();
}
