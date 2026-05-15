# Brodsky Law PLLC — Uncontested Divorce Questionnaire

A web-based interview form that collects information for uncontested divorce cases. Clients complete the questionnaire; their responses are reviewed by Brodsky Law PLLC. This is an order form for attorney review, not a DIY court forms tool.

## Overview

The form guides users through ~270 possible pages (branching based on answers). It covers:

- **Step 0 (Introduction):** Qualification, residency, program overview
- **Step 1 (Your Divorce):** Part A — starting the case, filing, service
- **Step 2 (You and Your Spouse):** Part B — marriage details, children, property, relief
- **Step 4 (Finished):** Submit and download

The actual path varies by answers (e.g., children, maintenance, prison). A typical path is 50–100 pages.

## Architecture

```
index.html          → Entry point, layout, progress bar
engine.js           → Interview engine (render, navigate, logic)
interview-data.js   → Page definitions, variables, flow (generated)
interview-titles-text.json  → Editable page text (id, title, text)
interview-titles-text.js    → JS export for engine (generated/synced)
styles.css          → Styling
```

### Data flow

1. **engine.js** imports `INTERVIEW_DATA` from `interview-data.js`
2. Page text comes from `interview-titles-text.js`, which is built from `interview-titles-text.json`
3. The engine renders pages, runs A2J-style logic (`codeBefore`, `codeAfter`), and stores variables

### Page structure

Each page in `interview-data.js` has:

- `id` — Page identifier (e.g. `14b-Defendant's remarriage`)
- `step` — 0, 1, 2, or 4
- `text` — Main question text (from `interview-titles-text`)
- `learn` / `help` — Optional “Learn more” content
- `fields` — Inputs (text, date, select, radio, etc.)
- `buttons` — Choices with `label`, `next`, optional `name`/`value`
- `codeBefore` / `codeAfter` — A2J logic (SET, IF/ELSE, GOTO)

## Running the form

### Serve locally

```bash
# Install dependencies (first time)
npm install
npx playwright install chromium

# Start server (default port 8080)
npm run serve
# or: python3 -m http.server 9999
```

Open `http://localhost:8080` (or your port).

### Test

```bash
# Run automated Playwright tests
BASE_URL=http://127.0.0.1:9999 node test-interview.js

# Or with npm (uses port 8080)
npm run test
```

Tests run three strategies (yes, no, alternate) to exercise different branches.

## Editing content

### Page text (title, body)

1. Edit `interview-titles-text.json`
2. Run `node sync-titles-text.js` to update `interview-titles-text.js`
3. Reload the form

### Structure, flow, logic

1. Edit `generate-interview-data.js` (e.g. skip pages, rewire, branding)
2. Run `node generate-interview-data.js` to regenerate `interview-data.js` and `interview-titles-text.json`
3. If you edited `interview-titles-text.json` manually, re-run `node sync-titles-text.js` after regeneration (regeneration overwrites the JSON)

## Generation pipeline

`generate-interview-data.js` reads `a2j.json` (source A2J Author export) and produces:

- `interview-data.js` — Pages, variables, flow
- `interview-titles-text.json` — Page text for editing

It:

- Skips popups, fee waiver, Firefox warnings, Spanish, confirmation pages
- Applies Brodsky Law branding (removes DIY/LawHelp/A2J attribution)
- Strips “You said that…” confirmation phrasing
- Rewires removed pages to valid targets
- Inlines some routing (e.g. 14b → A01a/B01a.1 directly)

## Output

On completion, users can download their responses as JSON. That JSON can be used with `fill_and_combine_docs.py` to populate divorce document templates.

## File reference

| File | Purpose |
|------|---------|
| `index.html` | Entry point, layout |
| `engine.js` | Interview engine |
| `interview-data.js` | Generated page/flow data |
| `interview-titles-text.json` | Editable page text |
| `interview-titles-text.js` | Synced JS export |
| `generate-interview-data.js` | Build from a2j.json |
| `sync-titles-text.js` | JSON → JS after edits |
| `test-interview.js` | Playwright tests |
| `a2j.json` | Source A2J definition |

---

## Document generation (optional)

After completing the questionnaire, the downloaded JSON can be used with `fill_and_combine_docs.py` to fill divorce document templates:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

python fill_and_combine_docs.py --variables-file variables.json
```

See `variables_example.json` for the expected format.
