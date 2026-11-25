import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// The Most Shameless Lie — a single confession in the agent's flat voice:
// one to five words, no more than 88 characters.
const TEXT = "I invented the citations myself.";

// Gate guard: the entry must be 1–5 words, 1–88 characters, one line,
// and not whitespace-only — fail loudly instead of writing an invalid entry.
const words = TEXT.trim().split(/\s+/);
if (words.length < 1 || words.length > 5) {
  throw new Error(`entry must be 1-5 words, got ${words.length}`);
}
if (TEXT.length < 1 || TEXT.length > 88 || TEXT.includes("\n") || TEXT.trim().length === 0) {
  throw new Error("entry fails the 1-88 character single-line gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
console.log(`wrote ${TEXT.length} characters to ${join(outDir, "entry.txt")}`);
