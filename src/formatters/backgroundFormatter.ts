import { Background, Step } from "gherkin-ast";
import { getDebugger } from "../debug";
import { FormatOptions } from "../index";
import { config, indent, lines } from "../utils";
import { format as formatStep } from "./stepFormatter";

const debug = getDebugger("backgroundFormatter");

export function format(background: Background, options?: Partial<FormatOptions>): string {
    debug("format(background: %s, options: %o)", background?.constructor.name, options);
    if (!background) {
        throw new Error("Background must be set!");
    }
    const l = lines(options);
    l.add(`${background.keyword}:${background.name ? " " + background.name : ""}`);
    if (background.description) {
        l.add(background.description);
    }
    if (background.steps.length > 0) {
        if (background.description) {
            l.add(null);
        }
        const addGroups = config(options).separateStepGroups;
        if (addGroups) {
            background.useReadableStepKeywords();
        }
        background.steps.forEach((step: Step, index: number) => {
            if (addGroups && step.keyword === "When" && index !== 0) {
                l.add();
            }
            l.add(indent(formatStep(step, options)));
        });
    }
    return l.toString();
}
