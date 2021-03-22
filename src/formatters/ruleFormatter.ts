import { Background, Rule, Scenario, ScenarioOutline } from "gherkin-ast";
import { FormatOptions } from "../index";
import { indent, lines } from "../utils";
import { format as formatBackground } from "./backgroundFormatter";
import { format as formatScenario } from "./scenarioFormatter";
import { format as formatScenarioOutline } from "./scenarioOutlineFormatter";
import { getDebugger } from '../debug';

const debug = getDebugger("ruleFormatter");

export function format(rule: Rule, options?: Partial<FormatOptions>): string {
    debug("format(rule: %s, options: %o)", rule?.constructor.name, options);
    if (!rule) {
        throw new Error("Rule must be set!");
    }
    const l = lines(options);
    l.add(`${rule.keyword}:${indent(rule.name, 1)}`);
    if (rule.description) {
        l.add(indent(rule.description));
    }
    if (rule.elements.length > 0) {
        rule.elements.forEach((item: Scenario | ScenarioOutline | Background | Rule) => {
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
