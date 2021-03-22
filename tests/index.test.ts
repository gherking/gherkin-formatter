import * as fs from "fs";
import * as path from "path";
import { Document, Feature } from "gherkin-ast";
import { read } from "gherkin-io";
import { format } from "../src";
import { format as formatBackground } from "../src/formatters/backgroundFormatter";
import { format as formatDataTable } from "../src/formatters/dataTableFormatter";
import { format as formatDocString } from "../src/formatters/docStringFormatter";
import { format as formatExamples } from "../src/formatters/examplesFormatter";
import { format as formatFeature } from "../src/formatters/featureFormatter";
import { format as formatGherkinDocument } from "../src/formatters/gherkinDocumentFormatter";
import { format as formatRule } from "../src/formatters/ruleFormatter";
import { format as formatScenario } from "../src/formatters/scenarioFormatter";
import { format as formatScenarioOutline } from "../src/formatters/scenarioOutlineFormatter";
import { format as formatStep } from "../src/formatters/stepFormatter";
import { format as formatTableCell } from "../src/formatters/tableCellFormatter";
import { format as formatTableRows } from "../src/formatters/tableRowFormatter";
import { format as formatTag } from "../src/formatters/tagFormatter";

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
    toFormat.emptyRule = await parse("emptyRule_toParse");
    expected.emptyRule = readFile("emptyRule_toParse");
    toFormat.oneTagPerLine = await parse("newLineOption_toParse");
    expected.oneTagPerLine = readFile("newLineOption_expected");
    toFormat.separateStepGroups = await parse("separateStepGroups_toParse");
    expected.separateStepGroups = readFile("separateStepGroups_expected");
    toFormat.compact = await parse("compact_toParse");
    expected.compact = readFile("compact_expected");
  });

  it("should format simple document", () => {
    expect(format(toFormat.base[0]).split(/\r?\n/g)).toEqual(expected.base.split(/\r?\n/g));
  });
  it("should throw error if the given object is not a GherkinDocument", () => {
    const feature = new Feature("S1", "S2", "S3");
    expect(() => format({ uri: "string", feature } as Document)).toThrow(/The passed object is not a GherkinDocument!/);
  });
  it("should format background without step but with description", () => {
    expect(format(toFormat.background[0]).split(/\r?\n/g)).toEqual(expected.background.split(/\r?\n/g));
  });
  it("should format feature without elements or description", () => {
    expect(format(toFormat.emptyFeature[0]).split(/\r?\n/g)).toEqual(expected.emptyFeature.split(/\r?\n/g));
  });
  it("should format rule without elements or description", () => {
    expect(format(toFormat.emptyRule[0]).split(/\r?\n/g)).toEqual(expected.emptyRule.split(/\r?\n/g));
  });
  it("should break tags to new lines", () => {
    expect(format(toFormat.oneTagPerLine[0], { oneTagPerLine: true }).split(/\r?\n/g)).toEqual(expected.oneTagPerLine.split(/\r?\n/g));
  });
  it("should separate step groups", () => {
    expect(format(toFormat.separateStepGroups[0], { separateStepGroups: true }).split(/\r?\n/g)).toEqual(expected.separateStepGroups.split(/\r?\n/g));
  });
  it("should skip empty lines", () => {
    expect(format(toFormat.compact[0], { compact: true }).split(/\r?\n/g)).toEqual(expected.compact.split(/\r?\n/g));
  });
  test("should handle missing document", () => {
    // @ts-ignore
    expect(() => format()).toThrow("Document must be set!");
  });
  describe("formatters", () => {
    test("backgroundFormatter > should handle missing background", () => {
      // @ts-ignore
      expect(() => formatBackground()).toThrow("Background must be set!");
    });
    test("dataTableFormatter > should handle missing dataTable", () => {
      // @ts-ignore
      expect(() => formatDataTable()).toThrow("DataTable must be set!");
    });
    test("docStringFormatter > should handle missing docString", () => {
      // @ts-ignore
      expect(() => formatDocString()).toThrow("DocString must be set!");
    });
    test("examplesFormatter > should handle missing examples", () => {
      // @ts-ignore
      expect(() => formatExamples()).toThrow("Examples must be set!");
    });
    test("featureFormatter > should handle missing Feature", () => {
      // @ts-ignore
      expect(() => formatFeature()).toThrow("Feature must be set!");
    });
    test("gherkinDocumentFormatter > should handle missing document", () => {
      // @ts-ignore
      expect(() => formatGherkinDocument()).toThrow("Document must be set!");
    });
    test("ruleFormatter > should handle missing rule", () => {
      // @ts-ignore
      expect(() => formatRule()).toThrow("Rule must be set!");
    });
    test("scenarioFormatter > should handle missing scenario", () => {
      // @ts-ignore
      expect(() => formatScenario()).toThrow("Scenario must be set!");
    });
    test("scenarioOutlineFormatter > should handle missing scenario outline", () => {
      // @ts-ignore
      expect(() => formatScenarioOutline()).toThrow("ScenarioOutline must be set!");
    });
    test("stepFormatter > should handle missing step", () => {
      // @ts-ignore
      expect(() => formatStep()).toThrow("Step must be set!");
    });
    test("tableCellFormatter > should handle missing table cell", () => {
      // @ts-ignore
      expect(() => formatTableCell()).toThrow("TableCell must be set!");
    });
    test("tableRowsFormatter > should handle missing table rows", () => {
      // @ts-ignore
      expect(() => formatTableRows()).toThrow("TableRows must be set!");
    });
    test("tagFormatter > should handle missing tags", () => {
      // @ts-ignore
      expect(() => formatTag()).toThrow("Tags must be set!");
    });
  });
});
