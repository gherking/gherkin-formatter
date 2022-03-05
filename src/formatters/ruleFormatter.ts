import { Background, Rule, Scenario, ScenarioOutline } from "gherkin-ast";
import { lines } from "lines-builder";
import { getDebugger } from "../debug";
import { FormatOptions } from "../index";
import { format as formatBackground } from "./backgroundFormatter";
import { format as formatScenario } from "./scenarioFormatter";
import { format as formatScenarioOutline } from "./scenarioOutlineFormatter";
import { format as formatTag } from "./tagFormatter";

const debug = getDebugger("ruleFormatter");

export function format(rule: Rule, options?: Partial<FormatOptions>): string {
    debug("format(rule: %s, options: %o)", rule?.constructor.name, options);
    if (!rule) {
        throw new Error("Rule must be set!");
    }
    const l = lines(`${rule.keyword}: ${rule.name}`);
    if (rule.precedingComment) {
        l.prepend(rule.precedingComment.text);
    }
    if (rule.tags.length > 0) {
        l.prepend(formatTag(rule.tags, options));
    }
    if (rule.tagComment) {
        l.prepend(rule.tagComment.text);
    }
    if (rule.description) {
        l.append(lines({ trimLeft: true }, rule.description));
    }
    if (rule.descriptionComment) {
        l.append(null, lines(rule.descriptionComment.text));
    }
    if (rule.elements.length > 0) {
        rule.elements.forEach((item: Scenario | ScenarioOutline | Background | Rule) => {
            if (item instanceof Scenario) {
                l.append(null, lines(formatScenario(item, options)));
            } else if (item instanceof ScenarioOutline) {
                l.append(null, lines(formatScenarioOutline(item, options)));
            } else if (item instanceof Background) {
                l.append(null, lines(formatBackground(item, options)));
            }
        });
    }
    return l.toString();
}
