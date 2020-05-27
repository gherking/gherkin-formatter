import { Document } from "gherkin-ast";
import { FormatOptions } from "../index";
import { FeatureFormatter } from "./featureFormatter";

/**
 * Model for Document
 */
export class GherkinDocumentFormatter {
    public static format(obj: Document, options: Partial<FormatOptions>): string {
        return FeatureFormatter.format(obj.feature, options);
    }
}
