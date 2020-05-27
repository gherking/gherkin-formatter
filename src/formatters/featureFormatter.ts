import { Feature, Scenario, ScenarioOutline, Background } from "gherkin-ast";
import { FormatOptions } from "../index";
import { TagFormatter } from "./tagFormatter";
import { ScenarioFormatter } from "./scenarioFormatter";
import { ScenarioOutlineFormatter } from "./scenarioOutlineFormatter";
import { indent, lines } from "../utils";
import { BackgroundFormatter } from './backgroundFormatter';

export class FeatureFormatter {
    public static format(obj: Feature, options: Partial<FormatOptions>): string {
        const l = lines(options);
        if (obj.tags.length > 0) {
            l.add(TagFormatter.format(obj.tags, options));
        }
        l.add(`${obj.keyword}: ${this.name}`);
        if (obj.description) {
            l.add(indent(obj.description));
        }
        if (obj.elements.length > 0) {
            obj.elements.forEach((item: Scenario | ScenarioOutline | Background) => {
                if (item instanceof Scenario) {
                    l.add(null, indent(ScenarioFormatter.format(item, options)));
                } else if(item instanceof ScenarioOutline) {
                    l.add(null, indent(ScenarioOutlineFormatter.format(item, options)));
                } else if (item instanceof Background){
                    l.add(null, indent(BackgroundFormatter.format(item, options)));
                }
            });
        }
        return l.toString();
    }
}
