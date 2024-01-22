import * as fs from "fs";
import {
    Background,
    Comment,
    DocString,
    Document,
    Examples,
    Feature,
    Rule,
    Scenario,
    Step,
    TableCell,
    TableRow,
    Tag,
    TagFormat
} from "gherkin-ast";
import { read } from "gherkin-io";
import { setDefaultOptions, splitToLines } from "lines-builder";
import * as path from "path";
import { format, config } from "../src";
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
    const toFormat: Record<string, Document[]> = {};
    const expected: Record<string, string> = {};

    beforeAll(async () => {
        toFormat.base = await parse("base");
        expected.base = readFile("base");
        toFormat.hu = await parse("hu");
        expected.hu = readFile("hu");
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

    test("should format simple document", () => {
        expect(splitToLines(format(toFormat.base[0]))).toEqual(splitToLines(expected.base));
    });

    test("should format localized document", () => {
        expect(splitToLines(format(toFormat.hu[0]))).toEqual(splitToLines(expected.hu));
    });

    test("should throw error if the given object is not a GherkinDocument", () => {
        const feature = new Feature("S1", "S2", "S3");
        expect(() => format({
            uri: "string",
            feature
        } as Document)).toThrow(/The passed object is not a GherkinDocument!/);
    });

    test("should format background without step but with description", () => {
        expect(splitToLines(format(toFormat.background[0]))).toEqual(splitToLines(expected.background));
    });

    test("should format feature without elements or description", () => {
        expect(splitToLines(format(toFormat.emptyFeature[0]))).toEqual(splitToLines(expected.emptyFeature));
    });

    test("should format rule without elements or description", () => {
        expect(splitToLines(format(toFormat.emptyRule[0]))).toEqual(splitToLines(expected.emptyRule));
    });

    test("should break tags to new lines", () => {
        expect(splitToLines(format(toFormat.oneTagPerLine[0], {
            oneTagPerLine: true,
            tagFormat: TagFormat.ASSIGNMENT
        }))).toEqual(splitToLines(expected.oneTagPerLine));
    });

    test("should separate step groups", () => {
        expect(splitToLines(format(toFormat.separateStepGroups[0], {separateStepGroups: true}))).toEqual(splitToLines(expected.separateStepGroups));
    });

    test("should skip empty lines", () => {
        expect(splitToLines(format(toFormat.compact[0], {compact: true}))).toEqual(splitToLines(expected.compact));
    });

    test("should handle missing document", () => {
        // @ts-ignore
        expect(() => format()).toThrow("Document must be set!");
    });

    // write tests for the config function, testing the default config, testing the set config, testing the reset config, testing the set config to undefined, testing the set config to null
    describe("config", () => {
        test("default config", () => {
            expect(config({})).toEqual({
                oneTagPerLine: false,
                separateStepGroups: false,
                compact: false,
                lineBreak: null,
                indentation: "  ",
                tagFormat: TagFormat.FUNCTIONAL,
            });
        });

        test("set config", () => {
            expect(config({
                oneTagPerLine: true,
                separateStepGroups: true,
                compact: true,
                lineBreak: "\n",
                indentation: "    ",
                tagFormat: TagFormat.PARAMETERLESS,
            })).toEqual({
                oneTagPerLine: true,
                separateStepGroups: true,
                compact: true,
                lineBreak: "\n",
                indentation: "    ",
                tagFormat: TagFormat.PARAMETERLESS,
            });
        });

        test("reset config", () => {
            expect(config({
                oneTagPerLine: false,
                separateStepGroups: false,
                compact: false,
                lineBreak: null,
                indentation: "  ",
                tagFormat: TagFormat.FUNCTIONAL,
            })).toEqual({
                oneTagPerLine: false,
                separateStepGroups: false,
                compact: false,
                lineBreak: null,
                indentation: "  ",
                tagFormat: TagFormat.FUNCTIONAL,
            });
        });

        test("set config to undefined", () => {
            expect(config({
                oneTagPerLine: undefined,
                separateStepGroups: undefined,
                compact: undefined,
                lineBreak: undefined,
                indentation: undefined,
                tagFormat: undefined,
            })).toEqual({
                oneTagPerLine: false,
                separateStepGroups: false,
                compact: false,
                lineBreak: null,
                indentation: "  ",
                tagFormat: TagFormat.FUNCTIONAL,
            });
        });

        test("set config to null", () => {
            expect(config({
                oneTagPerLine: null,
                separateStepGroups: null,
                compact: null,
                lineBreak: null,
                indentation: null,
                tagFormat: null,
            })).toEqual({
                oneTagPerLine: false,
                separateStepGroups: false,
                compact: false,
                lineBreak: null,
                indentation: "  ",
                tagFormat: TagFormat.FUNCTIONAL,
            });
        });
    });

    describe("formatters", () => {
        beforeAll(() => {
            setDefaultOptions({skipEmpty: false});
        });

        describe("backgroundFormatter", () => {
            test("should handle missing background", () => {
                // @ts-ignore
                expect(() => formatBackground()).toThrow("Background must be set!");
            });

            test("should handle comments", () => {
                const background = new Background("Background", "name", "description\nsecond line");
                background.descriptionComment = new Comment("# description\n# comment");
                background.precedingComment = new Comment("# preceeding\n# comment");
                background.steps = [new Step("Given", "step")];
                const result = formatBackground(background);
                expect(splitToLines(result)).toEqual([
                    "# preceeding",
                    "# comment",
                    "Background: name",
                    "  description",
                    "  second line",
                    "",
                    "  # description",
                    "  # comment",
                    "",
                    "  Given step"
                ]);
            });
        });

        describe("dataTableFormatter", () => {
            test("should handle missing dataTable", () => {
                // @ts-ignore
                expect(() => formatDataTable()).toThrow("DataTable must be set!");
            });
        });

        describe("docStringFormatter", () => {
            test("should handle missing docString", () => {
                // @ts-ignore
                expect(() => formatDocString()).toThrow("DocString must be set!");
            });

            test("should handle comments", () => {
                const docString = new DocString("first line\nsecond line", "```", "markdown");
                docString.comment = new Comment("# first line of comment\n# second line of comment");
                const result = formatDocString(docString);
                expect(splitToLines(result)).toEqual([
                    "# first line of comment",
                    "# second line of comment",
                    "```markdown",
                    "first line",
                    "second line",
                    "```"
                ]);
            });
        });

        describe("examplesFormatter", () => {
            test("should handle missing examples", () => {
                // @ts-ignore
                expect(() => formatExamples()).toThrow("Examples must be set!");
            });

            test("should handle comments", () => {
                const examples = new Examples("Examples", "name");
                examples.tagComment = new Comment("# tag\n# comment");
                examples.precedingComment = new Comment("# preceeding\n# comment");
                examples.tags = [new Tag("suite", "smoke")];
                examples.header = new TableRow([new TableCell("a")]);
                examples.header.comment = new Comment("# header");
                examples.body = [new TableRow([new TableCell("aaaa")])];
                examples.body[0].comment = new Comment("# row");
                const result = formatExamples(examples);
                expect(splitToLines(result)).toEqual([
                    "# tag",
                    "# comment",
                    "@suite(smoke)",
                    "# preceeding",
                    "# comment",
                    "Examples: name",
                    "  # header",
                    "  | a    |",
                    "  # row",
                    "  | aaaa |"
                ]);
            });
        });

        describe("featureFormatter", () => {
            test("should handle missing Feature", () => {
                // @ts-ignore
                expect(() => formatFeature()).toThrow("Feature must be set!");
            });

            test("should handle comments", () => {
                const feature = new Feature("Jellemző", "name", "description", "hu");
                feature.descriptionComment = new Comment("# description\n# comment");
                feature.tagComment = new Comment("# tag\n# comment");
                feature.precedingComment = new Comment("# preceeding\n# comment");
                feature.elements = [new Background("Háttér", "name", "description")];
                feature.tags = [new Tag("suite", "smoke")];
                feature.language = 'hu';
                const result = formatFeature(feature);
                expect(splitToLines(result)).toEqual([
                    "# language: hu",
                    "# tag",
                    "# comment",
                    "@suite(smoke)",
                    "# preceeding",
                    "# comment",
                    "Jellemző: name",
                    "  description",
                    "",
                    "  # description",
                    "  # comment",
                    "",
                    "  Háttér: name",
                    "    description",
                ]);
            });
        });

        describe("gherkinDocumentFormatter", () => {
            test("should handle missing document", () => {
                // @ts-ignore
                expect(() => formatGherkinDocument()).toThrow("Document must be set!");
            });

            test("should handle comments", () => {
                const document = new Document("uri", new Feature("Jellemző", "name", "description", "hu"));
                document.startComment = new Comment("# start\n# comment");
                document.endComment = new Comment("# end\n# comment");
                const result = formatGherkinDocument(document);
                expect(splitToLines(result)).toEqual([
                    "# start",
                    "# comment",
                    "",
                    "# language: hu",
                    "Jellemző: name",
                    "  description",
                    "",
                    "# end",
                    "# comment"
                ]);
            });
        });

        describe("ruleFormatter", () => {
            test("should handle missing rule", () => {
                // @ts-ignore
                expect(() => formatRule()).toThrow("Rule must be set!");
            });

            test("should handle comments", () => {
                const rule = new Rule("Rule", "name", "description");
                rule.tagComment = new Comment("# tag\n# comment");
                rule.precedingComment = new Comment("# preceeding\n# comment");
                rule.descriptionComment = new Comment("# description\n# comment");
                rule.elements = [new Background("Background", "name", "description")];
                rule.tags = [new Tag("suite", "smoke")];
                const result = formatRule(rule);
                expect(splitToLines(result)).toEqual([
                    "# tag",
                    "# comment",
                    "@suite(smoke)",
                    "# preceeding",
                    "# comment",
                    "Rule: name",
                    "  description",
                    "",
                    "  # description",
                    "  # comment",
                    "",
                    "  Background: name",
                    "    description",
                ]);
            });
        });

        describe("scenarioFormatter", () => {
            test("should handle missing scenario", () => {
                // @ts-ignore
                expect(() => formatScenario()).toThrow("Scenario must be set!");
            });

            test("should handle comments", () => {
                const scenario = new Scenario("Scenario", "name", "description");
                scenario.tagComment = new Comment("# tag\n# comment");
                scenario.precedingComment = new Comment("# preceeding\n# comment");
                scenario.descriptionComment = new Comment("# description\n# comment");
                scenario.tags = [new Tag("suite", "smoke")];
                scenario.steps = [new Step("Given", "step")];
                scenario.steps[0].comment = new Comment("# step");
                const result = formatScenario(scenario);
                expect(splitToLines(result)).toEqual([
                    "# tag",
                    "# comment",
                    "@suite(smoke)",
                    "# preceeding",
                    "# comment",
                    "Scenario: name",
                    "  description",
                    "",
                    "  # description",
                    "  # comment",
                    "",
                    "  # step",
                    "  Given step"
                ]);
            });
        });

        describe("scenarioOutlineFormatter", () => {
            test("should handle missing scenario outline", () => {
                // @ts-ignore
                expect(() => formatScenarioOutline()).toThrow("ScenarioOutline must be set!");
            });
        });

        describe("stepFormatter", () => {
            test("should handle missing step", () => {
                // @ts-ignore
                expect(() => formatStep()).toThrow("Step must be set!");
            });
        });

        describe("tableCellFormatter", () => {
            test(" > should handle missing table cell", () => {
                // @ts-ignore
                expect(() => formatTableCell()).toThrow("TableCell must be set!");
            });
            test("should handle pipes", () => {
                const rows = [
                    new TableRow([
                        new TableCell("a \#"),
                        new TableCell("b"),
                    ]),
                    new TableRow([
                        new TableCell("a | a | a"),
                        new TableCell("b &'\"+!%/=()™£$‹›{[]}\\-_.:,?;@"),
                    ]),
                ];
                const result = formatTableRows(rows);
                expect(splitToLines(result)).toEqual([
                    "| a \\#        | b                              |",
                    "| a \\| a \\| a | b &'\"+!%/=()™£$‹›{[]}\\-_.:,?;@ |"]);
            });
        });

        describe("tableRowsFormatter", () => {
            test("should handle missing table rows", () => {
                // @ts-ignore
                expect(() => formatTableRows()).toThrow("TableRows must be set!");
            });

            test("should handle comments", () => {
                const rows = [
                    new TableRow([
                        new TableCell("a"),
                        new TableCell("b"),
                    ]),
                    new TableRow([
                        new TableCell("aaa"),
                        new TableCell("bbbbb"),
                    ]),
                ];
                rows[1].comment = new Comment("# it is a comment\n# a multiline one");
                const result = formatTableRows(rows);
                expect(splitToLines(result)).toEqual(["| a   | b     |", "# it is a comment", "# a multiline one", "| aaa | bbbbb |"]);
            });
        })

        describe("tagFormatter", () => {
            let tags: Tag[];

            beforeEach(() => {
                tags = [
                    new Tag("a", "1"),
                    new Tag("a", "2"),
                    new Tag("a", "3"),
                ];
            })
            test("should handle missing tags", () => {
                // @ts-ignore
                expect(() => formatTag()).toThrow("Tags must be set!");
            });

            test("should format single line without comments", () => {
                expect(splitToLines(formatTag(tags, {oneTagPerLine: false}))).toEqual(["@a(1) @a(2) @a(3)"]);
            });

            test("should format multi line without comments", () => {
                expect(splitToLines(formatTag(tags, {oneTagPerLine: true}))).toEqual(["@a(1)", "@a(2)", "@a(3)"]);
            });

            test("should format single line with comments", () => {
                tags[0].comment = new Comment("# 1");
                tags[1].comment = new Comment("# 2");
                expect(splitToLines(formatTag(tags, {oneTagPerLine: false}))).toEqual([
                    "# 1",
                    "@a(1)",
                    "# 2",
                    "@a(2) @a(3)"
                ]);
            });

            test("should format multi line with comments", () => {
                tags[0].comment = new Comment("# 1");
                tags[1].comment = new Comment("# 2");
                expect(splitToLines(formatTag(tags, {oneTagPerLine: true}))).toEqual([
                    "# 1",
                    "@a(1)",
                    "# 2",
                    "@a(2)",
                    "@a(3)"
                ]);
            });
        });
    });
});
