import { Tag } from "gherkin-ast";
import { lines } from "lines-builder";
import { getDebugger } from "../debug";
import { FormatOptions, config } from "../index";

const debug = getDebugger("tagFormatter");

export function format(tags: Tag[], options?: Partial<FormatOptions>): string {
    debug("format(tags: %s, options: %o)", tags?.constructor.name, options);
    if (!tags) {
        throw new Error("Tags must be set!");
    }
    options = config(options);
    return lines({ eol: options.oneTagPerLine ? null : " ", indent: "" }, ...tags.map(tag => tag.toString())).toString();
}
