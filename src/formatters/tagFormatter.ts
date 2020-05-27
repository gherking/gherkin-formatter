import { Tag } from "gherkin-ast";
import { FormatOptions } from "../index";
import { config, lines } from "../utils";

export class TagFormatter {
    public static format(tags: Array<Tag>, options: Partial<FormatOptions>): string {
        options = config(options);
        if (!options.oneTagPerLine) {
            return tags.join(' ');
        }
        const l = lines(options);
        tags.forEach(tag => {
            l.add(tag.toString());
        });
        return l.toString();
    }
}