import { format, FormatOptions } from "../src";
import { Document } from "gherkin-ast";

describe("gherkin-formatter", () => {
    test("should pass", () => {
        const document: Document = new Document("uri");
        const options: FormatOptions = {lineBreak:"\n"} as FormatOptions; 
        expect(format(document, options)).toBe("{\"document\":{\"uri\":\"uri\",\"feature\":null},\"options\":{\"lineBreak\":\"\\n\"}}");
    });
});
