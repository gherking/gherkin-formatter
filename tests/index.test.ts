import * as fs from "fs";
import * as path from "path";

import { Document, Feature } from "gherkin-ast";
import { read } from "gherkin-io";
import { format } from "../src";

const readFile = (fileName: string) => fs.readFileSync(path.resolve(`tests/testData/${fileName}.feature`), "utf8");
const parse = async (fileName: string) => await read(`tests/testData/${fileName}.feature`);

describe("gherkin-formatter", () => {
  // tslint:disable-next-line: no-any
  const toFormat: any = {};
  // tslint:disable-next-line: no-any
  const expected: any = {};

  beforeAll(async () => {
    toFormat.base = await parse("base");
    expected.base = readFile("base");
    toFormat.background = await parse("background");
    expected.background = readFile("background");
    toFormat.emptyFeature = await parse("emptyFeature_toParse");
    expected.emptyFeature = readFile("emptyFeature_toParse");
    toFormat.oneTagPerLine = await parse("newLineOption_toParse");
    expected.oneTagPerLine = readFile("newLineOption_expected");
    toFormat.separateStepGroups = await parse("separateStepGroups_toParse");
    expected.separateStepGroups = readFile("separateStepGroups_expected");
  });

  it("should format simple document", async () => {
    expect(format(toFormat.base[0]).split(/\r?\n/g)).toEqual(expected.base.split(/\r?\n/g));
  });
  it("should throw error if the given object is not a GherkinDocument", async () => {
    const feature = new Feature("S1", "S2", "S3");
    expect(() => format({uri: "string", feature} as Document))
    .toThrow(/The passed object is not a GherkinDocument!/);
  });
  it("should format array of documents", async () => {
    format(toFormat.base).forEach((res: string) => {
      expect(res.split(/\r?\n/g)).toEqual(expected.base.split(/\r?\n/g));
    });
  });
  it("should format background without step but with description", async () => {
    expect(format(toFormat.background[0]).split(/\r?\n/g)).toEqual(expected.background.split(/\r?\n/g));
  });
  it("should format feature without elements or description", async () => {
    expect(format(toFormat.emptyFeature[0]).split(/\r?\n/g)).toEqual(expected.emptyFeature.split(/\r?\n/g));
  });
  it("should break tags to new lines", async () => {
    expect(format(toFormat.oneTagPerLine[0], { oneTagPerLine: true }).split(/\r?\n/g))
    .toEqual(expected.oneTagPerLine.split(/\r?\n/g));
  });
  it("should separate step groups", async () => {
    expect(format(toFormat.separateStepGroups[0], { separateStepGroups: true }).split(/\r?\n/g))
    .toEqual(expected.separateStepGroups.split(/\r?\n/g));
  });
});
