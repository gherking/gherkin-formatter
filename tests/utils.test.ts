"use strict";

import { indent, lines, Lines } from "../src/utils";

describe("Utils", () => {

    describe(".indent()", () => {
        it("should indent one-line text", () => {
            expect(indent("text to indent", 4)).toEqual("    text to indent");
        });

        it("should indent multi-line text", () => {
            expect(indent("text to indent\nagain", 4)).toEqual("    text to indent\n    again");
        });

        it("should not indent empty lines", () => {
            expect(indent("text to indent\n\nagain")).toEqual("  text to indent\n\n  again");
        });

        it("should indent with one level by default", () => {
            expect(indent("text to indent")).toEqual("  text to indent");
        });

        it("should indent with one level by default - chained function", () => {
            const l: Lines = lines();
            expect(l.add("text to indent").indent().toString()).toEqual("  text to indent");
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
                expect(l.add("new line").toString()).toEqual("new line");
            });

            it("should handle multiple lines too", () => {
                expect(l.add("new line\nother line").toString()).toEqual("new line\nother line");
            });

            it("should handle empty lines", () => {
                expect(l.add("new line", null, "other line", undefined, "another line").toString()).toEqual("new line\n\nother line\n\nanother line");
            });
        });
    });
});
