import { Step } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines, indent } from "../utils";
import { DataTableFormatter } from './dataTableFormatter';
import { DocStringFormatter } from './docStringFormatter';

export class StepFormatter {
    public static format(step: Step, options: Partial<FormatOptions>): string {
        const l = lines(options);
        l.add(`${step.keyword} ${step.text}`);
        if (step.docString ) {
            l.add(indent(DocStringFormatter.format(step.docString, options)));
        }
        if (step.dataTable ) {
            l.add(indent(DataTableFormatter.format(step.dataTable, options)));
        }
        return l.toString();
    }
}