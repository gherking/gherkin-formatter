import * as fs from "fs";
import * as path from "path";

import { format } from "../src";
const featureFile = fs.readFileSync(path.resolve("tests/testData/base.feature"), "utf8");
import { read } from "gherkin-io";


describe("gherkin-formatter", () => {
  it("should format simple document", async () => {
    const documents = await read("tests/testData/base.feature");
    expect(format(documents[0]).split(/\r?\n/g)).toEqual(featureFile.split(/\r?\n/g));
  });
  it("should format array of documents", async () => {
    const documents = await read("tests/testData/base.feature");
    const result = format(documents);
    result.forEach((res: string) => {
    expect(res.split(/\r?\n/g)).toEqual(featureFile.split(/\r?\n/g));
            });
  });
});
