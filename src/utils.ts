"use strict";
/* tslint:disable:no-any */

const split = require("split-lines");
const Table = require("cli-table");
const colors = require("colors/safe");

/**
 * @class
 * @extends Table
 */
class StrippedTable extends Table {
    constructor(config: any) {
        super(config);
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

const INDENTATION = "  ";

/**
 * Object to build a text file, from lines.
 * @class
 */
class Lines {
    private options: any;
    // tslint:disable-next-line:variable-name
    private _lines: any[];

    /**
     * @constructor
     * @param {AssemblerConfig} [options]
     */
    constructor(options: any) {
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
    public add(...texts: any[]) {
        if (!texts.length) {
            this._lines.push("");
        } else {
            texts.forEach((text) => {
                this._lines.push.apply(this._lines, split(text || ""));
            });
        }
    }

    /**
     * Indents all non-empty lines with the given number of indentation.
     * @param {number} [indentation] Number of indentations, default: 1
     */
    public indent(indentation = 1) {
        indentation = Math.max(indentation, 0);
        if (indentation) {
            this._lines = this._lines.map((line) => {
                return line ? INDENTATION.repeat(indentation) + line : "";
            });
        }
    }

    /**
     * Normalizes the given text,
     * i.e. trims multiple trailing, leading
     * and inner spaces too.
     */
    public normalize() {
        this._lines = this._lines.map((line) => line.trim().replace(/\s+/g, " "));
    }

    /**
     * Returns the whole text file content.
     * @returns {string}
     */
    public toString() {
        let lines = this._lines;
        if (this.options.compact) {
            lines = lines.filter(Boolean);
        }
        return lines.join(this.options.lineBreak);
    }
}

/**
 * Creates a new Lines object to build text file.
 * @param {AssemblerConfig} [options]
 * @returns {Lines}
 */
export const lines = (options?: any) => {
    return new Lines(options);
};

/**
 * Normalizes the given text,
 * i.e. trims multiple trailing, leading
 * and inner spaces too.
 * @param {string} [text]
 * @returns {string}
 */
export const normalize = (text: any) => {
    if (!text) {
        return "";
    }
    const lines = exports.lines();
    lines.add(text);
    lines.normalize();
    return lines.toString();
};


export const replaceAll = (subject: any, key: RegExp, value: any) => {
    if (!(key instanceof RegExp)) {
        key = new RegExp(key, "g");
    }
    return (subject || "").replace(key, value);
};

export const toSafeString = (subject: any) => {
    return (subject || "").replace(/\s/g, "_");
};

/**
* Creates a new Table object to build tables.
* @returns {StrippedTable}
*/
export const table = () => {
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
        styles: {
            border: [],
            head: [],
        },
    });
};

export const config = (options: any) => {
    return Object.assign({}, DEFAULT_OPTIONS, options || {});
};

/**
 * Indents the given text with
 * given number of space pairs.
 * @param {string} text Text to indent
 * @param {number} [indentation] Number of indentations, default: 1
 * @returns {string}
 */
export const indent = (text: any, indentation = 1) => {
    // tslint:disable-next-line:no-shadowed-variable
    const lines = exports.lines();
    lines.add(text);
    lines.indent(indentation);
    return lines.toString();
};
