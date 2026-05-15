#!/usr/bin/env node
/**
 * Sync interview-titles-text.json -> interview-titles-text.js
 * Run this after editing interview-titles-text.json so the engine picks up changes.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, 'interview-titles-text.json');
const jsPath = path.join(__dirname, 'interview-titles-text.js');

const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
fs.writeFileSync(jsPath, `/** Page text - edit interview-titles-text.json, then: node sync-titles-text.js */\nexport default ${JSON.stringify(data)};\n`);
console.log('✓ Synced interview-titles-text.js');
