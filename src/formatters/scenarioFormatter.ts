import { Scenario, Step } from "gherkin-ast";
import { FormatOptions } from "../index";
import { config, indent, lines } from "../utils";
import { format as formatStep } from "./stepFormatter";
import { format as formatTag } from "./tagFormatter";

export function format(scenario: Scenario, options: Partial<FormatOptions>): string {
    const l = lines(options);
    if (scenario.tags.length > 0) {
        l.add(formatTag(scenario.tags, options));
    }
    l.add(`${scenario.keyword}: ${scenario.name}`);
    if (scenario.description) {
        l.add(scenario.description, null);
    }
    if (scenario.steps.length > 0) {
        const addGroups = config(options).separateStepGroups;
        if (addGroups) {
            scenario.useReadableStepKeywords();
        }
        scenario.steps.forEach((step: Step) => {
            if (addGroups && step.keyword === "When") {
                l.add();
            }
            l.add(indent(formatStep(step, options)));
        });
    }
    return l.toString();
}
