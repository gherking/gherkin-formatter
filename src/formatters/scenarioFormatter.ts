import { Scenario, Step } from "gherkin-ast";
import { getDebugger } from "../debug";
import { FormatOptions } from "../index";
import { config, indent, lines } from "../utils";
import { format as formatStep } from "./stepFormatter";
import { format as formatTag } from "./tagFormatter";

const debug = getDebugger("scenarioFormatter");

export function format(scenario: Scenario, options?: Partial<FormatOptions>): string {
    debug("format(scenario: %s, options: %o)", scenario?.constructor.name, options);
    if (!scenario) {
        throw new Error("Scenario must be set!");
    }
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
        scenario.steps.forEach((step: Step, index: number) => {
            if (addGroups && step.keyword === "When" && index !== 0) {
                l.add();
            }
            l.add(indent(formatStep(step, options)));
        });
    }
    return l.toString();
}
