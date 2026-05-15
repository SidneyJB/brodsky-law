/**
 * Copies the divorcio ES-module bundle to public/intake so the browser can load
 * /intake/engine.js and its sibling modules at stable URLs.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "divorcio");
const outDir = path.join(root, "public", "intake");

const FILES = [
  "engine.js",
  "interview-data.js",
  "humanize-form.js",
  "interview-titles-text.js",
];

fs.mkdirSync(outDir, { recursive: true });

for (const name of FILES) {
  const from = path.join(srcDir, name);
  const to = path.join(outDir, name);
  fs.copyFileSync(from, to);
}

console.log(`sync-divorcio-to-public: copied ${FILES.length} files → ${path.relative(root, outDir)}`);
