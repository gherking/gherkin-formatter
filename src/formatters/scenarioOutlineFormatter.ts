import { ScenarioOutline } from "gherkin-ast";
import { FormatOptions } from "../index";
import { lines } from "../utils";
import { ScenarioFormatter } from './scenarioFormatter';
import { ExamplesFormatter } from './examplesFormatter';

export class ScenarioOutlineFormatter {
    public static format(scenarioOutline: ScenarioOutline, options: Partial<FormatOptions>): string {
        const l = lines(options);
        l.add(ScenarioFormatter.format(scenarioOutline, options));
        if (scenarioOutline.examples.length > 0) {
            scenarioOutline.examples.forEach(examples => {
                l.add(null, ExamplesFormatter.format(examples, options));
            });
        }
        return l.toString();
    }
}