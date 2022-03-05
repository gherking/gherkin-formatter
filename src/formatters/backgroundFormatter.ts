import { Background, Step } from "gherkin-ast";
import { getDebugger } from "../debug";
import { FormatOptions, config } from "../index";
import { lines } from "lines-builder";
import { format as formatStep } from "./stepFormatter";

const debug = getDebugger("backgroundFormatter");

export function format(background: Background, options?: Partial<FormatOptions>): string {
    debug("format(background: %s, options: %o)", background?.constructor.name, options);
    if (!background) {
        throw new Error("Background must be set!");
    }
    const l = lines(`${background.keyword}: ${background.name}`);
    if (background.precedingComment) {
        l.prepend(background.precedingComment.text);
    }
    if (background.description) {
        l.append(lines({ trimLeft: true }, background.description));
    }
    if (background.descriptionComment) {
        l.append(null, lines(background.descriptionComment.text));
    }
    if (background.steps.length > 0) {
        if (background.description || background.descriptionComment) {
            l.append(null);
        }
        const addGroups = config(options).separateStepGroups;
        if (addGroups) {
            background.useReadableStepKeywords();
        }
        background.steps.forEach((step: Step, index: number) => {
            if (addGroups && step.keyword === "When" && index !== 0) {
                l.append(null);
            }
            l.append(lines(formatStep(step)));
        });
    }
    return l.toString();
}
