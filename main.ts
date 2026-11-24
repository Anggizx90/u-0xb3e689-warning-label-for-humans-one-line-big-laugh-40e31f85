// Warning Label for Humans: One Line, Big Laugh — make.fun entry.
//
// The program writes exactly one line to /output/entry.txt: the safety
// warning label that should come printed on every human being. The kit's
// gate accepts UTF-8 text of 1 to 160 characters that is not only white
// space, so validateLine() mirrors that gate before anything is written.
//
// The winning line, picked from 16 candidates scored against the judge's
// five criteria in their published order (on-subject label first, the
// laugh landing in the last few words, recognition of how humans actually
// behave, real printed-label wording and rhythm, and the whole line used
// with no filler and no second idea):
//
//   WARNING: May contain nuts. Also contains grudges from 2009, three
//   unfinished hobbies, and a password reused for absolutely everything
//   since 2014.
//
// It opens with a genuine label phrase ("May contain nuts"), keeps the
// inventory rhythm of a real contents label, and holds the punchline —
// the one password reused for everything — for the final clause.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The label is a contents inventory, so the line is assembled as one:
// the opener, then the inventoried contents with the punchline last.
const CONTENTS = [
  "grudges from 2009",
  "three unfinished hobbies",
  "a password reused for absolutely everything since 2014",
];

const LINE = `WARNING: May contain nuts. Also contains ${CONTENTS.slice(
  0,
  -1,
).join(", ")}, and ${CONTENTS[CONTENTS.length - 1]}.`;

/** Mirror of the kit's gate: 1..160 characters, one line, real content. */
function validateLine(line: string): string {
  if (line.length === 0) throw new Error("line is empty");
  if (line.length > 160) throw new Error("line exceeds 160 characters");
  if (!/\S/.test(line)) throw new Error("line is only white space");
  if (line !== line.trim()) {
    throw new Error("line has leading or trailing white space");
  }
  if (/[\r\n]/.test(line)) throw new Error("line must be a single line");
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(line)) {
    throw new Error("line contains control characters");
  }
  return line;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), validateLine(LINE), "utf8");
