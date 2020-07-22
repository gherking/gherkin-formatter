import { Background } from "gherkin-ast";
import { FormatOptions } from "../index";
import { config, indent, lines } from "../utils";
import { format as formatStep } from "./stepFormatter";

export function format(background: Background, options: Partial<FormatOptions>): string {
    const l = lines(options);
    l.add(`${background.keyword}:${background.name ? " " + background.name : ""}`);
    if (background.description) {
        l.add(background.description, null);
    }
    if (background.steps.length > 0) {
        const addGroups = config(options).separateStepGroups;
        if (addGroups) {
            background.useReadableStepKeywords();
        }
        background.steps.forEach((step) => {
            if (addGroups && step.keyword === "When") {
                l.add();
            }
            l.add(indent(formatStep(step, options)));
        });
    }
    return l.toString();
}
