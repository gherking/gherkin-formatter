import { Document } from "gherkin-ast";
import { FormatOptions } from "../index";
import { format as formatFeature } from "./featureFormatter";

export function format(obj: Document, options: Partial<FormatOptions>): string {
    return formatFeature(obj.feature, options);
}
