"use strict";

import { indent, lines, Lines, normalize } from "../src/utils";

describe("Utils", () => {
    describe(".normalize()", () => {
        it("should replace multiple inline spaces", () => {
            expect(normalize("some     text")).toEqual("some text");
        });

        it("should replace leading and trailing spaces", () => {
            expect(normalize("  some text  ")).toEqual("some text");
        });

        it("should handle multi-line texts too", () => {
            expect(normalize("  some\n  text  again  ")).toEqual("some\ntext again");
        });

        it("should handle if not argument is passed", () => {
            expect(normalize()).toEqual("");
        });
    });

    describe(".indent()", () => {
        it("should indent one-line text", () => {
            expect(indent("text to indent", 2)).toEqual("    text to indent");
        });

        it("should indent multi-line text", () => {
            expect(indent("text to indent\nagain", 2)).toEqual("    text to indent\n    again");
        });

        it("should not indent empty lines", () => {
            expect(indent("text to indent\n\nagain")).toEqual("  text to indent\n\n  again");
        });

        it("should indent with one level by default", () => {
            expect(indent("text to indent")).toEqual("  text to indent");
        });

        it("should not indent if negative value is passed", () => {
            expect(indent("text to indent", -20)).toEqual("text to indent");
        });

        it("should not indent if 0 is passed", () => {
            expect(indent("text to indent", 0)).toEqual("text to indent");
        });
    });

    describe(".lines() / Lines", () => {
        let l: Lines;

        beforeEach(() => {
            l = lines();
        });

        it("should be a Lines object", () => {
            expect(l.constructor.name).toEqual("Lines");
            expect(l.lines).toEqual([]);
        });

        describe(".add()", () => {
            it("should add the given text as new line", () => {
                l.add("new line");
                expect(l.lines).toEqual(["new line"]);
            });

            it("should handle multiple lines too", () => {
                l.add("new line\nother line");
                expect(l.lines).toEqual(["new line", "other line"]);
            });

            it("should handle multiple arguments", () => {
                l.add("new line", "other line");
                expect(l.lines).toEqual(["new line", "other line"]);
            });

            it("should add empty line if no argument passed", () => {
                l.add();
                expect(l.lines).toEqual([""]);
            });

            it("should handle empty lines in multiple arguments", () => {
                l.add("new line", null, "other line", undefined, "another line");
                expect(l.lines).toEqual(["new line", "", "other line", "", "another line"]);
            });
        });

        describe(".toString()", () => {
            it("should handle simple line", () => {
                l.add("new line");
                expect(l.toString()).toEqual("new line");
            });

            it("should handle multiple lines too", () => {
                l.add("new line\nother line");
                expect(l.toString()).toEqual("new line\nother line");
            });

            it("should handle empty lines", () => {
                l.add("new line", null, "other line", undefined, "another line");
                expect(l.toString()).toEqual("new line\n\nother line\n\nanother line");
            });
        });
    });
});
