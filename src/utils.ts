"use strict";

import * as t from "table";
import { getDebugger } from "./debug";

const debug = getDebugger("utils");

export const table = (data: unknown[][]): string => {
    debug("table(data: %o)", data);
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
