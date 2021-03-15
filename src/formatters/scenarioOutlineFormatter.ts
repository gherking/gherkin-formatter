import { ScenarioOutline } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines } from "../utils";
import { format as formatExamples } from "./examplesFormatter";
import { format as formatScenario } from "./scenarioFormatter";
import { getDebugger } from '../debug';

const debug = getDebugger("scenarioOutlineFormatter");

export function format(scenarioOutline: ScenarioOutline, options: Partial<FormatOptions>): string {
    debug("format(scenarioOutline: %s, options: %o)", scenarioOutline.constructor.name, options);
    const l = lines(options);
    l.add(formatScenario(scenarioOutline, options));
    if (scenarioOutline.examples.length > 0) {
        scenarioOutline.examples.forEach((examples) => {
            l.add(null, formatExamples(examples, options));
        });
    }
    return l.toString();
}
