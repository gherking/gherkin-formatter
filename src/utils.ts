"use strict";

import Table = require("cli-table");
import colors = require("colors/safe");
import { FormatOptions } from "./index";
import { getDebugger } from './debug';

const debug = getDebugger("utils");

interface TableOptions {
    chars: Partial<Record<(
        "top" |
        "top-mid" |
        "top-left" |
        "top-right" |
        "bottom" |
        "bottom-mid" |
        "bottom-left" |
        "bottom-right" |
        "left" |
        "left-mid" |
        "mid" |
        "mid-mid" |
        "right" |
        "right-mid" |
        "middle"
    ), string>>;
    truncate: string;
    colors: boolean;
    colWidths: number[];
    colAligns: Array<"left" | "middle" | "right">;
    style: Partial<{
        "padding-left": number;
        "padding-right": number;
        head: string[];
        border: string[];
        compact: boolean;
    }>;
    head: string[];
}

/**
 * @class
 * @extends Table
 */
class StrippedTable extends Table {
    constructor(StrippedTableConfig: Partial<TableOptions>) {
        super(StrippedTableConfig);
    }

    public toString() {
        return colors.strip(super.toString());
    }
}

/**
 * @typedef {Object} AssemblerConfig
 * @property {boolean} oneTagPerLine Should tags be rendered one per line?
 * @property {boolean} compact Should empty lines be added?
 * @property {boolean} separateStepGroups Should step groups (when-then) be separated?
 * @property {string} lineBreak The linebreak character(s)
 * @property {string} indentation The indentation character(s)
 */

/** @type {AssemblerConfig} */
const DEFAULT_OPTIONS = {
    oneTagPerLine: false,
    compact: false,
    separateStepGroups: false,
    lineBreak: "\n",
    indentation: "  ",
};

const INDENTATION = " ";

/**
 * Object to build a text file, from lines.
 * @class
 */
export class Lines {
    private options: Partial<FormatOptions>;
    // tslint:disable-next-line:variable-name
    private _lines: string[];

    get lines(): string[] {
        return this._lines;
    }

    /**
     * @constructor
     * @param {AssemblerConfig} [options]
     */
    constructor(options: Partial<FormatOptions>) {
        /** @member {boolean} */
        this.options = config(options);
        /**
         * @type {Array<string>}
         * @private
         */
        this._lines = [];
    }

    /**
     * Adds a new line with the given text.
     * If the text is not passed,
     * it will be an empty line
     * @param {...string|*} [texts]
     */
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

    /**
     * Indents all non-empty lines with the given number of indentation.
     * @param {number} [indentation] Number of indentations, default: 1
     */
    public indent(indentation: number = 2): Lines {
        indentation = Math.max(indentation, 0);
        if (indentation) {
            this._lines = this._lines.map((line) => {
                return line ? INDENTATION.repeat(indentation) + line : "";
            });
        }
        return this;
    }

    /**
     * Returns the whole text file content.
     * @returns {string}
     */
    public toString(): string {
        let linesToString = this._lines;
        if (this.options.compact) {
            linesToString = linesToString.filter(Boolean);
        }
        return linesToString.join(this.options.lineBreak);
    }
}

/**
 * Creates a new Lines object to build text file.
 * @param {AssemblerConfig} [options]
 * @returns {Lines}
 */
export const lines = (options?: Partial<FormatOptions>): Lines => {
    debug("lines(options: %o)", options);
    return new Lines(options);
};

/**
 * Creates a new Table object to build tables.
 * @returns {StrippedTable}
 */
export const table = (): StrippedTable => {
    return new StrippedTable({
        chars: {
            "top": "",
            "top-mid": "",
            "top-left": "",
            "top-right": "",
            "bottom": "",
            "bottom-mid": "",
            "bottom-left": "",
            "bottom-right": "",
            "left": "|",
            "left-mid": "",
            "mid": "",
            "mid-mid": "",
            "right": "|",
            "right-mid": "",
            "middle": "|",
        },
        style: {
            border: [],
            head: [],
        },
    });
};

export const config = (options: Partial<FormatOptions>) => {
    debug("config(options: %o)", options);
    return Object.assign({}, DEFAULT_OPTIONS, options || {});
};

/**
 * Indents the given text with
 * given number of space.
 * @param {string} text Text to indent
 * @param {number} [indentation] Number of indentations, default: 1
 * @returns {string}
 */
export const indent = (text: string, indentation: number = 2): string => {
    debug("indent(text: %s, indentation: %d)", text, indentation);
    return lines().add(text).indent(indentation).toString();
};
