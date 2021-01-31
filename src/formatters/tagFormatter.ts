import { Tag } from "gherkin-ast";
import { FormatOptions } from "../index";
import { config, lines } from "../utils";

export function format(tags: Tag[], options: Partial<FormatOptions>): string {
    options = config(options);
    if (!options.oneTagPerLine) {
        return tags.map((tag) => tag.toString()).join(" ");
    }
    const l = lines(options);
    tags.forEach((tag) => {
        l.add(tag.toString());
    });
    return l.toString();
}
