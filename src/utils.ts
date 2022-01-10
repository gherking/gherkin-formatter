"use strict";

import * as t from "table";
import { getDebugger } from "./debug";
import { FormatOptions } from "./index";

const debug = getDebugger("utils");

const DEFAULT_OPTIONS: FormatOptions = {
    oneTagPerLine: false,
    compact: false,
    separateStepGroups: false,
    lineBreak: "\n",
    indentation: "  ",
};

const INDENTATION = " ";

export class Lines {
    private options: Partial<FormatOptions>;
    // tslint:disable-next-line:variable-name
    private _lines: string[];

    get lines(): string[] {
        return this._lines;
    }

    constructor(options: Partial<FormatOptions>) {
        this.options = config(options);
        this._lines = [];
    }

    public add(...texts: string[]): Lines {
        if (!texts.length) {
            this._lines.push("");
        } else {
            texts.forEach((text) => {
                text = text || "";
                this._lines.push.apply(this._lines, text.split(/\r\n|\r|\n/gm));
            });
        }
        return this;
    }

    public indent(indentation: number = 2): Lines {
        indentation = Math.max(indentation, 0);
        if (indentation) {
            this._lines = this._lines.map((line) => {
                return line ? INDENTATION.repeat(indentation) + line : "";
            });
        }
        return this;
    }

    public toString(): string {
        let linesToString = this._lines;
        if (this.options.compact) {
            linesToString = linesToString.filter(Boolean);
        }
        return linesToString.join(this.options.lineBreak);
    }
}

export const lines = (options?: Partial<FormatOptions>): Lines => {
    debug("lines(options: %o)", options);
    return new Lines(options);
};

export const table = (data: unknown[][]): string => {
    return t.table(data, {
        border: {
            topBody: "",
            topJoin: "",
            topLeft: "",
            topRight: "",

            bottomBody: "",
            bottomJoin: "",
            bottomLeft: "",
            bottomRight: "",

            bodyLeft: "|",
            bodyRight: "|",
            bodyJoin: "|",

            joinBody: "",
            joinLeft: "",
            joinRight: "",
            joinJoin: ""
        },
        drawHorizontalLine: () => false,
    }).trim();
};

export const config = (options: Partial<FormatOptions>) => {
    debug("config(options: %o)", options);
    return Object.assign({}, DEFAULT_OPTIONS, options || {});
};

export const indent = (text: string, indentation: number = 2): string => {
    debug("indent(text: %s, indentation: %d)", text, indentation);
    return lines().add(text).indent(indentation).toString();
};
