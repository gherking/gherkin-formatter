import { Scenario, Step } from "gherkin-ast";
import { FormatOptions } from "../index";
import { config, lines, indent } from "../utils";
import { TagFormatter } from './tagFormatter';
import { StepFormatter } from './stepFormatter';

export class ScenarioFormatter {
    public static format(scenario: Scenario, options: Partial<FormatOptions>): string {
        const l = lines(options);
        if (scenario.tags.length > 0) {
            l.add(TagFormatter.format(scenario.tags, options));
        }
        l.add(`${scenario.keyword}: ${this.name}`);
        if (scenario.description) {
            l.add(scenario.description, null);
        }
        if (scenario.steps.length > 0) {
            const addGroups = config(options).separateStepGroups;
            if (addGroups) {
                scenario.useReadableStepKeywords();
            }
            scenario.steps.forEach((step: Step) => {
                if (addGroups && step.keyword === 'When') {
                    l.add();
                }
                l.add(indent(StepFormatter.format(step, options)));
            });
        }
        return l.toString();
    }
}