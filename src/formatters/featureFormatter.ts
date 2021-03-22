import { Background, Feature, Rule, Scenario, ScenarioOutline } from "gherkin-ast";
import { FormatOptions } from "../index";
import { indent, lines } from "../utils";
import { format as formatBackground } from "./backgroundFormatter";
import { format as formatRule } from "./ruleFormatter";
import { format as formatScenario } from "./scenarioFormatter";
import { format as formatScenarioOutline } from "./scenarioOutlineFormatter";
import { format as formatTag } from "./tagFormatter";
import { getDebugger } from '../debug';

const debug = getDebugger("featureFormatter");

export function format(feature: Feature, options?: Partial<FormatOptions>): string {
    debug("format(feature: %s, options: %o)", feature?.constructor.name, options);
    if (!feature) {
        throw new Error("Feature must be set!");
    }
    const l = lines(options);
    if (feature.tags.length > 0) {
        l.add(formatTag(feature.tags, options));
    }
    l.add(`${feature.keyword}:${indent(feature.name, 1)}`);
    if (feature.description) {
        l.add(indent(feature.description));
    }
    if (feature.elements.length > 0) {
        feature.elements.forEach((item: Scenario | ScenarioOutline | Background | Rule) => {
            if (item instanceof Scenario) {
                l.add(null, indent(formatScenario(item, options)));
            } else if (item instanceof ScenarioOutline) {
                l.add(null, indent(formatScenarioOutline(item, options)));
            } else if (item instanceof Background) {
                l.add(null, indent(formatBackground(item, options)));
            } else if (item instanceof Rule) {
                l.add(null, indent(formatRule(item, options)));
            }
        });
    }
    return l.toString();
}
