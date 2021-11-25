#!/usr/bin/env node
import { format, FormatOptions } from "./index";
import { read } from "gherkin-io";
import * as args from "args";
import { DEFAULT_OPTIONS } from "./utils";
import { writeFileSync  } from "fs";
import { getDebugger } from "./debug";

const debug = getDebugger("cli");

args
  .option("oneTagPerLine", "Should tags be rendered separately, one by line", DEFAULT_OPTIONS.oneTagPerLine)
  .option("separateStepGroups", "Should step groups (when-then) be separated", DEFAULT_OPTIONS.separateStepGroups)
  .option("compact", "Should empty lines be skipped, removed from the result", DEFAULT_OPTIONS.compact)
  .option("lineBreak", "Character used for line break", DEFAULT_OPTIONS.lineBreak)
  .option("indentation", "Characters used for indentation", DEFAULT_OPTIONS.indentation);

const flags = args.parse(process.argv);
const options = buildOptionsFromFlags(flags);
const filesPath = getFilesPath();

formatFiles(filesPath, options);

function buildOptionsFromFlags(flags: Record<string, any>): FormatOptions {
  return {
    lineBreak: flags.lineBreak,
    indentation: flags.indentation,
    compact: flags.compact,
    oneTagPerLine: flags.oneTagPerLine,
    separateStepGroups: flags.separateStepGroups,
  }
}

function getFilesPath(): string {
  if (process.argv.length < 3) {
    return "./**/*.feature";
  }
  return process.argv[2];
}

function formatFiles(filesPath: string, options: FormatOptions): void {
  read(filesPath).then(documents => {  
    documents.forEach((document) => {
      const formattedContent = format(document, options);
      writeFileSync(document.uri, formattedContent, { encoding: 'utf-8' });
      debug("formatted file: %s", document.uri);
    });
  });
}
