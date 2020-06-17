import { Tag } from "gherkin-ast";
import { FormatOptions } from "../index";
import { config, lines } from "../utils";

export function format(tags: Tag[], options: Partial<FormatOptions>): string {
    options = config(options);
    if (!options.oneTagPerLine) {
        // TODO ?
        // return tags.join(" ");
        return tags.map((tag) => tag.name).join(" ");
    }
    const l = lines(options);
    tags.forEach((tag) => {
        // TODO ?
        // l.add(tag.toString());
        l.add(tag.name);
    });
    return l.toString();
}
