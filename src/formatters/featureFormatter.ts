import { Background, Feature, Rule, Scenario, ScenarioOutline } from "gherkin-ast";
import { getDebugger } from "../debug";
import { FormatOptions } from "../index";
import { lines } from "lines-builder";
import { format as formatBackground } from "./backgroundFormatter";
import { format as formatRule } from "./ruleFormatter";
import { format as formatScenario } from "./scenarioFormatter";
import { format as formatScenarioOutline } from "./scenarioOutlineFormatter";
import { format as formatTag } from "./tagFormatter";

const debug = getDebugger("featureFormatter");

export function format(feature: Feature, options?: Partial<FormatOptions>): string {
    debug("format(feature: %s, options: %o)", feature?.constructor.name, options);
    if (!feature) {
        throw new Error("Feature must be set!");
    }
    const l = lines(`${feature.keyword}: ${feature.name}`);
    if (feature.tags.length > 0) {
        l.prepend(formatTag(feature.tags, options));
    }
    if (feature.description) {
        l.append(lines({ trim: true }, feature.description));
    }
    if (feature.elements.length > 0) {
        feature.elements.forEach((item: Scenario | ScenarioOutline | Background | Rule) => {
            if (item instanceof Scenario) {
                l.append(null, lines(formatScenario(item, options)));
            } else if (item instanceof ScenarioOutline) {
                l.append(null, lines(formatScenarioOutline(item, options)));
            } else if (item instanceof Background) {
                l.append(null, lines(formatBackground(item, options)));
            } else if (item instanceof Rule) {
                l.append(null, lines(formatRule(item, options)));
            }
        });
    }
    return l.toString();
}
