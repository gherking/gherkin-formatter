import { Background, Feature, Scenario, ScenarioOutline } from "gherkin-ast";
import { FormatOptions } from "../index";
import { indent, lines } from "../utils";
import { format as formatBackground } from "./backgroundFormatter";
import { format as formatScenario } from "./scenarioFormatter";
import { format as formatScenarioOutline } from "./scenarioOutlineFormatter";
import { format as formatTag } from "./tagFormatter";

export function format(obj: Feature, options: Partial<FormatOptions>): string {
    const l = lines(options);
    if (obj.tags.length > 0) {
        l.add(formatTag(obj.tags, options));
    }
    l.add(`${obj.keyword}: ${obj.name}`);
    if (obj.description) {
        l.add(indent(obj.description));
    }
    if (obj.elements.length > 0) {
        obj.elements.forEach((item: Scenario | ScenarioOutline | Background) => {
            if (item instanceof Scenario) {
                l.add(null, indent(formatScenario(item, options)));
            } else if (item instanceof ScenarioOutline) {
                l.add(null, indent(formatScenarioOutline(item, options)));
            } else if (item instanceof Background) {
                l.add(null, indent(formatBackground(item, options)));
            }
        });
    }
    return l.toString();
}
