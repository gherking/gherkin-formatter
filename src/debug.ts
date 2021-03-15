import debug = require("debug");

export const getDebugger = (m: string):debug.Debugger => debug(`gherkin-formatter:${m}`);