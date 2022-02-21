import { Scenario, Step } from "gherkin-ast";
import { lines } from "lines-builder";
import { getDebugger } from "../debug";
import { FormatOptions, config } from "../index";
import { format as formatStep } from "./stepFormatter";
import { format as formatTag } from "./tagFormatter";

const debug = getDebugger("scenarioFormatter");

export function format(scenario: Scenario, options?: Partial<FormatOptions>): string {
    debug("format(scenario: %s, options: %o)", scenario?.constructor.name, options);
    if (!scenario) {
        throw new Error("Scenario must be set!");
    }
    const l = lines(`${scenario.keyword}: ${scenario.name}`);
    if (scenario.preceedingComment) {
        l.prepend(scenario.preceedingComment.text);
    }
    if (scenario.tags.length > 0) {
        l.prepend(formatTag(scenario.tags, options));
    }
    if (scenario.tagComment) {
        l.prepend(scenario.tagComment.text);
    }
    if (scenario.description) {
        l.append(lines({ trimLeft: true }, scenario.description));
    }
    if (scenario.descriptionComment) {
        l.append(null, lines(scenario.descriptionComment.text));
    }
    if (scenario.steps.length > 0) {
        if (scenario.description || scenario.descriptionComment) {
            l.append(null);
        }
        const addGroups = config(options).separateStepGroups;
        if (addGroups) {
            scenario.useReadableStepKeywords();
        }
        scenario.steps.forEach((step: Step, index: number) => {
            if (addGroups && step.keyword === "When" && index !== 0) {
                l.append(null);
            }
            l.append(lines(formatStep(step)));
        });
    }
    return l.toString();
}
