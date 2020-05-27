import { Background } from "gherkin-ast";
import { FormatOptions } from "../index";
import { config, lines, indent } from "../utils";
import { StepFormatter } from './stepFormatter';

export class BackgroundFormatter {
    public static format(background: Background, options: Partial<FormatOptions>): string {
        const l = lines(options);
        l.add(`${background.keyword}:${this.name ? ' ' + this.name : ''}`);
        if (background.description) {
            l.add(background.description, null);
        }
        if (background.steps.length > 0) {
            const addGroups = config(options).separateStepGroups;
            if (addGroups) {
                background.useReadableStepKeywords();
            }
            background.steps.forEach(step => {
                if (addGroups && step.keyword === 'When') {
                    l.add();
                }
                l.add(indent(StepFormatter.format(step, options)));
            });
        }
        return l.toString();
    }
}