import { Document } from "gherkin-ast";
import { format, FormatOptions } from "../src";

describe("gherkin-formatter", () => {
    test("should pass", () => {
        const document: Document = new Document("uri");
        const options: FormatOptions = { lineBreak: "\n" } as FormatOptions;
        expect(format(document, options))
            .toBe("{\"document\":{\"uri\":\"uri\",\"feature\":null},\"options\":{\"lineBreak\":\"\\n\"}}");
    });
});
