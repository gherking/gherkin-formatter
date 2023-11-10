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
  if (options.oneTagPerLine) {
    const l = lines();
    for (const tag of tags) {
      if (tag.comment) {
        l.append(tag.comment.text);
      }
      l.append(tag.toString());
    }
    return l.toString();
  }
  let ls: string = "";
  for (const tag of tags) {
    if (tag.comment) {
      ls += `${ls ? '\n' : ''}${tag.comment.text}\n${tag.toString()}`;
    } else {
      ls += `${ls ? ' ' : ''}${tag.toString()}`;
    }
  }
  return lines(ls).toString();
}
