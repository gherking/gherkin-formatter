import * as fs from "fs";
import * as path from "path";

import { format } from "../src";
const featureAst = require("./testData/base.ast.json");
const featureFile = fs.readFileSync(path.resolve("tests/testData/base.feature"), "utf8");


describe("gherkin-formatter", () => {
  it("should format simple document", () => {
    expect(format(featureAst).split(/\r?\n/g)).toEqual(featureFile.split(/\r?\n/g));
  });
});
