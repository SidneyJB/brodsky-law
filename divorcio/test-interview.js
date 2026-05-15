#!/usr/bin/env node
/**
 * Automated Playwright test for Brodsky Law divorce interview.
 * Run: node test-interview.js
 * On SUCCESS, clicks Submit on the completion screen and requires the thank-you panel (true submission UX).
 * Prints a compact summary per scenario; set E2E_FULL_SNAPSHOT=1 for full JSON.
 * Set E2E_SNAPSHOT_OUT=/path/to/file.json to write engine state (includes formDataLog: question text + answers per screen).
 * Submit step requires a real HTTP 200 from the Zapier Catch Hook (same as production).
 *
 * One scenario only: a single “happy path” that stays in the interview and fills mock data. That validates that
 * the engine persists answers (formDataLog + variables) for the questions on that path — not exhaustive branching
 * (other branches would need extra tests only if you change those flows). Optional: npm run interview:graph
 * Requires: npx playwright install chromium && npm run serve (port 9999)
 *
 * Submit debugging (when Zapier/submit fails):
 *   E2E_SUBMIT_DEBUG_LOG=/path/to.log — append JSON diagnostics to a file on failure.
 *   In the browser: ?submitDebug=1 or localStorage.setItem('divorcio_submit_debug','1') for extra console.warn in engine.js.
 *
 * Speed: the loop polls the page; most wall time is (steps × E2E_STEP_DELAY_MS). Default delay is tiny (5ms).
 * Extra waits after radio exist because the engine defers navigation ~300ms. Tune E2E_MAX_STEPS if needed.
 *
 * Use HEADED=1 to see the browser: HEADED=1 node test-interview.js
 * Optional: PLAYWRIGHT_BROWSERS_PATH=/path/to/ms-playwright (only set if you need a non-default cache).
 * Do not force node_modules/.../.local-browsers — an empty folder breaks launch even when ~/.cache browsers exist.
 *
 * Sandboxes (e.g. Cursor) may set PLAYWRIGHT_BROWSERS_PATH to a cache that is empty or incomplete. If the
 * path has no chromium-* folders, unset it and fall back to ~/Library/Caches/ms-playwright (macOS) or
 * ~/.cache/ms-playwright. If the path already contains a Playwright install (including after npx playwright install
 * in that sandbox), it is left unchanged.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

(function fixPlaywrightBrowsersPath() {
  const p = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (p) {
    let hasChromium = false;
    try {
      hasChromium =
        fs.existsSync(p) && fs.readdirSync(p).some((e) => /^chromium/i.test(e));
    } catch (_) {}
    if (!hasChromium) delete process.env.PLAYWRIGHT_BROWSERS_PATH;
  }

  function trySet(dir) {
    if (!dir) return false;
    try {
      if (fs.existsSync(dir) && fs.readdirSync(dir).some((e) => /^chromium/i.test(e))) {
        process.env.PLAYWRIGHT_BROWSERS_PATH = dir;
        return true;
      }
    } catch (_) {}
    return false;
  }

  if (!process.env.PLAYWRIGHT_BROWSERS_PATH) {
    if (!trySet(path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright'))) {
      const xdg = process.env.XDG_CACHE_HOME || path.join(os.homedir(), '.cache');
      trySet(path.join(xdg, 'ms-playwright'));
    }
  }
})();

console.log('Starting test...');
const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:9999';
/** Safety cap on loop iterations (not “pages”); old default 3500 made failures very slow. */
const MAX_STEPS = Number(process.env.E2E_MAX_STEPS || 1500);
/** Per-iteration poll delay (ms). Was 30–50ms; that adds ~15–25s per 500 steps for no benefit once Playwright awaits clicks. */
const STEP_DELAY_MS = Number(process.env.E2E_STEP_DELAY_MS || 5);
const PROGRESS_EVERY = Math.max(1, Number(process.env.E2E_PROGRESS_EVERY || 100));
/** After clicking button_choice, the engine calls navigate ~300ms later; wait once so we do not re-act on the same screen. */
const BUTTON_CHOICE_WAIT_MS = Number(process.env.E2E_BUTTON_CHOICE_WAIT_MS || 320);

const MOCK = {
  first: 'Robert',
  last: 'Chen',
  middle: 'J',
  spouse_first: 'Sarah',
  spouse_last: 'Chen',
  /** Full street + unit (e.g. children JSON, single-line “address” fields) */
  address: '1425 Park Avenue Apt 8B',
  address_line1: '1425 Park Avenue',
  address_line2: 'Apt 8B',
  city: 'New York',
  state: 'New York',
  stateShort: 'NY',
  zip: '10029',
  county: 'New York',
  ssn: '123-45-6789',
  spouse_ssn: '234-56-7890',
  phone: '212-555-1234',
  email: 'test@example.com',
  email_plaintiff: 'robert.chen@example.com',
  email_defendant: 'sarah.chen@example.com',
  date: '2020-01-15',
  marriage_date: '2012-09-12',
  number: '50000',
  employer_plaintiff: 'Hudson Media Group',
  employer_defendant: 'East River Consulting LLC',
  docket: 'FC-2020-12345',
  prior_surname_plaintiff: 'Taylor',
  prior_surname_defendant: 'Nguyen',
  initiating_papers: 'Summons and Complaint',
};

/**
 * Map A2J / Brodsky variable names to consistent mock values.
 * Order matters: more specific patterns (email, address line1/2) before generic substrings (address, date).
 */
function getMockValue(name, type) {
  const n = (name || '').toLowerCase();
  // A2J date fields end with " DA" — do not use n.includes('da'): it matches "defendant" (…d+a…).
  if (n.includes('marriage') && n.includes('date')) return MOCK.marriage_date;
  const looksLikeDateField =
    type === 'datemdy' || n.includes('date') || /\sda$/i.test(String(name || '').trim());
  if (looksLikeDateField) return MOCK.date;
  if (n.includes('first') && (n.includes('plaintiff') || n.includes('name first'))) return MOCK.first;
  if (n.includes('last') && (n.includes('plaintiff') || n.includes('name last'))) return MOCK.last;
  if (n.includes('middle') && n.includes('plaintiff')) return MOCK.middle;
  if (n.includes('first') && n.includes('defendant')) return MOCK.spouse_first;
  if (n.includes('last') && n.includes('defendant')) return MOCK.spouse_last;
  if (n.includes('middle') && n.includes('defendant')) return '';
  if (n.includes('prior') && n.includes('surname')) {
    return n.includes('defendant') ? MOCK.prior_surname_defendant : MOCK.prior_surname_plaintiff;
  }
  if (n.includes('employer')) {
    return n.includes('defendant') ? MOCK.employer_defendant : MOCK.employer_plaintiff;
  }
  if (n.includes('docket')) return MOCK.docket;
  if (n.includes('initiating') && n.includes('paper')) return MOCK.initiating_papers;
  // “Email address” contains “address” — match email before any address/street rule.
  if (n.includes('email')) {
    if (n.includes('defendant')) return MOCK.email_defendant;
    if (n.includes('plaintiff')) return MOCK.email_plaintiff;
    return MOCK.email;
  }
  // Before generic "address" — Brodsky children health plan addresses must not match marital/street logic only.
  if (n.includes('brodsky') && n.includes('children') && n.includes('health')) {
    if (n.includes('children group health plan name')) return "Children's Sample Health Plan";
    if (n.includes('member id')) return 'CH-MEM-1001';
    if (n.includes('group number')) return 'CHG-556';
    if (n.includes('administrator')) return 'Benefits Administrator (children)';
    if (n.includes('coverage type')) return 'Medical / dental';
    if (n.includes('address')) return MOCK.address;
  }
  if (n.includes('brodsky')) {
    if (n.includes('other residence detail'))
      return `${MOCK.address_line1}, ${MOCK.city}, ${MOCK.stateShort} ${MOCK.zip} (2021–2023)`;
    if (n.includes('custody') && n.includes('which children')) return `${MOCK.first} Jr ${MOCK.last}`;
  }
  if (n.includes('address')) {
    if (n.includes('line2') || n.includes('line 2')) return MOCK.address_line2;
    if (n.includes('line1') || n.includes('line 1')) return MOCK.address_line1;
    return MOCK.address;
  }
  if (n.includes('street')) return MOCK.address_line1;
  if (n.includes('city')) return MOCK.city;
  if (n.includes('state') && !n.includes('statement')) return MOCK.stateShort || MOCK.state;
  if (n.includes('zip') || n.includes('postal')) return MOCK.zip;
  if (n.includes('county')) return MOCK.county;
  if (n.includes('ssn') || n.includes('social')) return n.includes('defendant') ? MOCK.spouse_ssn : MOCK.ssn;
  if (n.includes('phone')) return MOCK.phone;
  if (n.includes('number') && n.includes('dollar')) return MOCK.number;
  if (n.includes('annual income')) return '75000';
  if (n.includes('race')) return 'White';
  if (n.includes('brodsky') && n.includes('health')) {
    if (n.includes('group health plan name')) return 'Sample Group Health Plan';
    if (n.includes('member id')) return 'MEM123456';
    if (n.includes('group number') && n.includes('te')) return 'G-78901';
    if (n.includes('administrator')) return 'Benefits Administrator Inc.';
    if (n.includes('coverage type')) return 'Medical / dental';
  }
  return MOCK.first;
}

/**
 * Screens where we choose the affirmative / stay-in-interview option (NY residency, grounds, confirmations).
 * Intro-only fields use scenario.intro. Default is “yes” so we do not branch to early exits (e.g. 05c-Residency exit).
 */
const QUALIFY_PATTERNS = [
  /lived in New York State continuously/i,
  /married in New York State/i,
  /live in New York State.*while you were married/i,
  /both you and.*live in New York State/i,
  /broken down irretrievably/i,
  /relationship.*can't be saved/i,
  /impossible.*to save or fix the marriage/i,
  /Part A filed|index number|already filed/i,
  /served.*personally delivered/i,
  /return.*Affirmation of Defendant/i,
  /military.*active duty/i,
  /sign the Affirmation/i,
  /Is this right\?/i,
  /Is this correct\?/i,
  /You said that your address/i,
  /You said that.*address/i,
  /You said that you and.*got married/i,
  /Did you get married on/i,
  /I live in.*County/i,
  /Both.*County/i,
  /Defendant.*County/i,
  /Jurisdiction county/i,
];

function isQualificationQuestion(questionText) {
  return QUALIFY_PATTERNS.some(p => p.test(questionText));
}

/**
 * Prefer staying in the interview and collecting detail: Yes on intro (unless scenario overrides), Yes on
 * qualifiers/confirmations, Yes by default on all other Yes/No groups (including 05b-Current residents).
 */
function pickYesForRadioGroup(ctx) {
  const { questionText, inLoop, radioName, scenario } = ctx;
  if (inLoop) return true;
  if (radioName === 'Intro marital issues agree TF') return scenario.intro.agree;
  if (radioName === 'Intro spouse will sign papers TF') return scenario.intro.sign;
  // Multi-button pages use name "button_choice". "Yes" on the prison gate sets Defendant in prison TF and
  // traps the scripted path (06c / service / SSN loop). Answer No unless the question asks about address.
  const q = questionText || '';
  if (
    radioName === 'button_choice' &&
    /\bis\s+.+\s+in prison\??/i.test(q) &&
    !/address/i.test(q)
  ) {
    return false;
  }
  if (radioName === 'Defendant in prison TF' || radioName === 'Plaintiff in prison TF') return false;
  if (isQualificationQuestion(questionText)) return true;
  if (/is this (right|correct)\?|you said that|did you get married on|were you married/i.test(questionText || '')) {
    return true;
  }
  return true;
}

/** Uncontested intro, then stay in-program and fill fields (engine formDataLog + variables). */
const DEFAULT_SCENARIO = {
  id: 'form-persistence',
  intro: { agree: true, sign: true },
};

/** Fail the run if the engine did not record core persistence (cheap guardrail, not full branch coverage). */
function validateFormDataRecording(snapshot) {
  const log = snapshot.formDataLog;
  if (!Array.isArray(log) || log.length === 0) {
    return 'formDataLog missing or empty';
  }
  const intro = log.find((e) => e.pageName === '00-Introduction');
  if (!intro?.answers || Object.keys(intro.answers).length < 2) {
    return '00-Introduction answers not recorded in formDataLog';
  }
  const vars = snapshot.variables || {};
  const bl01 = log.find((e) => e.pageName === 'BL-01-Children information');
  if (!bl01) {
    return 'BL-01-Children information not in formDataLog (children path not exercised)';
  }
  const childJson =
    vars['Brodsky children JSON TE'] ||
    bl01.answers?.['Brodsky children JSON TE'];
  try {
    const arr = typeof childJson === 'string' ? JSON.parse(childJson) : childJson;
    if (!Array.isArray(arr) || !arr[0] || !String(arr[0].name || '').trim()) {
      return 'Brodsky children JSON TE missing or has no child name in saved data';
    }
  } catch {
    return 'Brodsky children JSON TE is not valid JSON in saved data';
  }
  if (vars['Brodsky minor children MC'] !== 'yes') {
    return 'Brodsky minor children MC should be "yes" so children data is saved';
  }
  const partyProp = vars['Parties have property TF'];
  const maritalNone = vars['Marital property none MC'];
  const hasMaritalSaved =
    partyProp === true ||
    partyProp === 'true' ||
    maritalNone === 'have_property' ||
    log.some(
      (e) =>
        e.pageName === '04f.3-Any marital property' &&
        (e.answers?.['Parties have property TF'] === 'true' || e.answers?.choice === 'Yes')
    );
  if (!hasMaritalSaved) {
    return 'marital property not saved (need 04f.3 Yes and/or Marital property none MC=have_property)';
  }
  return null;
}

/** Full interview state from the running engine (sorted variable keys for readable diffs). */
async function collectInterviewSnapshot(page) {
  return page.evaluate(() => {
    const eng = window.interview;
    if (!eng || typeof eng.getState !== 'function') {
      return { error: 'window.interview.getState not available' };
    }
    const s = eng.getState();
    const vars = s.variables && typeof s.variables === 'object' ? s.variables : {};
    const keys = Object.keys(vars).sort();
    const variablesSorted = Object.fromEntries(keys.map((k) => [k, vars[k]]));
    const postSubmit = document.getElementById('success-post-submit');
    const submittedUiVisible =
      postSubmit && postSubmit.style && postSubmit.style.display !== 'none';

    const log = s.formDataLog;
    return {
      currentPageName: s.currentPageName,
      pageHistory: s.pageHistory || [],
      pagesInStep: s.pagesInStep || {},
      stepStates: s.stepStates || {},
      variables: variablesSorted,
      variablesReadable: s.variablesReadable && typeof s.variablesReadable === 'object' ? s.variablesReadable : {},
      a2jVariableSuffixMeanings:
        s.a2jVariableSuffixMeanings && typeof s.a2jVariableSuffixMeanings === 'object'
          ? s.a2jVariableSuffixMeanings
          : {},
      variableCount: keys.length,
      formDataLog: Array.isArray(log) ? log : [],
      formDataLogCount: Array.isArray(log) ? log.length : 0,
      submittedThankYouVisible: submittedUiVisible,
    };
  });
}

/** Buffer filled by Playwright listeners (network + console) for Zapier submit debugging. */
function createSubmitDebugBuffer() {
  return {
    consoleLines: [],
    pageErrors: [],
    requestFailed: [],
    zapierRequest: [],
    zapierResponse: [],
  };
}

/**
 * Attach verbose listeners before navigation. Helps diagnose submit failures (CORS, 413, timeouts).
 * @param {import('playwright').Page} page
 * @param {ReturnType<typeof createSubmitDebugBuffer>} buf
 */
function attachSubmitDebugListeners(page, buf) {
  page.on('console', (msg) => {
    const text = msg.text();
    buf.consoleLines.push({ type: msg.type(), text, t: new Date().toISOString() });
    if (buf.consoleLines.length > 150) buf.consoleLines.shift();
  });
  page.on('pageerror', (err) => {
    buf.pageErrors.push({
      t: new Date().toISOString(),
      message: err.message,
      stack: err.stack ? String(err.stack).slice(0, 2500) : '',
    });
    if (buf.pageErrors.length > 30) buf.pageErrors.shift();
  });
  page.on('requestfailed', (req) => {
    const url = req.url();
    if (url.includes('zapier.com') || url.includes('hooks.zapier')) {
      const fail = req.failure();
      buf.requestFailed.push({
        t: new Date().toISOString(),
        url: url.slice(0, 800),
        method: req.method(),
        failure: fail ? fail.errorText : 'unknown',
      });
    }
  });
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('hooks.zapier.com') && req.method() === 'POST') {
      const pd = req.postData();
      buf.zapierRequest.push({
        t: new Date().toISOString(),
        url: url.slice(0, 300),
        postDataLength: pd != null ? pd.length : null,
        hasPostData: pd != null,
      });
    }
  });
  page.on('response', (res) => {
    const url = res.url();
    if (!url.includes('hooks.zapier.com')) return;
    buf.zapierResponse.push({
      t: new Date().toISOString(),
      status: res.status(),
      ok: res.ok(),
      statusText: res.statusText(),
      url: url.slice(0, 300),
      method: res.request().method(),
    });
  });
}

/**
 * Merge engine window.__divorcioSubmitDebug + DOM submit UI + Playwright buffer.
 * @param {import('playwright').Page} page
 * @param {ReturnType<typeof createSubmitDebugBuffer>} submitDebug
 */
async function collectSubmitDiagnostics(page, submitDebug) {
  let clientDebug = null;
  try {
    clientDebug = await page.evaluate(() => (typeof window !== 'undefined' ? window.__divorcioSubmitDebug : null));
  } catch (e) {
    clientDebug = { evaluateError: e.message };
  }
  const submitUi = await page
    .evaluate(() => {
      const err = document.getElementById('submit-error');
      const btn = document.getElementById('submit-btn');
      const pre = document.getElementById('success-pre-submit');
      const post = document.getElementById('success-post-submit');
      return {
        submitErrorVisible: !!(err && err.style.display !== 'none'),
        submitErrorText: err ? String(err.textContent || '').slice(0, 800) : '',
        submitButtonText: btn ? String(btn.textContent || '').trim() : '',
        submitButtonDisabled: btn ? btn.disabled : null,
        successPreSubmitDisplay: pre ? pre.style.display : null,
        successPostSubmitDisplay: post ? post.style.display : null,
      };
    })
    .catch(() => ({}));
  return {
    at: new Date().toISOString(),
    clientDebug,
    submitUi,
    playwright: submitDebug || {},
  };
}

async function runStrategy(page, scenario, submitDebug) {
  const dbg = submitDebug || createSubmitDebugBuffer();
  const visited = new Set();
  const errors = [];
  let step = 0;

  while (step < MAX_STEPS) {
    if (STEP_DELAY_MS > 0) {
      await page.waitForTimeout(STEP_DELAY_MS);
    }

    const state = await page.evaluate(() => {
      const eng = window.interview;
      const currentPageName = eng?.currentPageName || '';
      const docTitle = document.title || '';
      const success = document.getElementById('success-card');
      const question = document.getElementById('question-card');
      const loading = document.getElementById('loading');
      const errorEl = document.getElementById('error-message');
      const errorText = errorEl?.style?.display !== 'none' ? errorEl.textContent : '';
      const qEl = document.getElementById('question-text');
      const questionText = (
        qEl?.innerText ||
        qEl?.textContent ||
        document.getElementById('page-title')?.textContent ||
        ''
      ).trim();

      const inputs = [...document.querySelectorAll('input, select, textarea')]
        .filter(el => el.offsetParent !== null)
        .map(el => ({
          tag: el.tagName,
          type: el.type || el.nodeName,
          name: el.name,
          value: el.value,
          options: el.options ? [...el.options].map(o => ({ value: o.value, text: o.textContent })) : [],
        }));

      const buttons = [...document.querySelectorAll('button')]
        .filter(b => b.offsetParent !== null && !b.closest('.learn-more'))
        .map(b => ({ text: b.textContent.trim() }));

      const radios = [...document.querySelectorAll('input[type="radio"]')]
        .filter(r => r.offsetParent !== null)
        .map((r) => {
          let label = r.closest('label')?.textContent?.trim();
          if (!label && r.id) {
            const lab = document.querySelector(`label[for="${r.id}"]`);
            label = lab?.textContent?.trim() || '';
          }
          return {
            name: r.name,
            value: r.value,
            checked: r.checked,
            label: label || r.value,
          };
        });

      const pageHistoryLength = Array.isArray(eng?.pageHistory) ? eng.pageHistory.length : 0;

      return {
        currentPageName,
        docTitle,
        pageHistoryLength,
        successVisible: success?.style?.display !== 'none',
        questionVisible: question?.style?.display !== 'none',
        loadingVisible: loading?.style?.display !== 'none',
        errorText,
        questionText,
        inputs,
        buttons,
        radios,
      };
    });

    if (step > 0 && step % PROGRESS_EVERY === 0) {
      const q = (state.questionText || '').replace(/\s+/g, ' ').trim().slice(0, 80);
      console.log(
        `  [progress] step ${step}/${MAX_STEPS} page=${state.currentPageName || '?'}${q ? ` — ${q}…` : ''}`
      );
    }

    if (state.loadingVisible) {
      step++;
      continue;
    }

    // Intro contested-case modal blocks Continue until dismissed
    try {
      const modal = page.locator('#contested-modal');
      if (await modal.isVisible()) {
        await page.click('#contested-modal-ok');
        await page.waitForTimeout(80);
        continue;
      }
    } catch {}

    if (state.successVisible) {
      /** Completion screen is shown; "Get Document" already ran. Still need explicit Submit for full submission. */
      let clickedSubmit = false;
      try {
        const submit = page.locator('#submit-btn');
        if (await submit.isVisible() && !(await submit.isDisabled())) {
          const zapierOk = page.waitForResponse(
            (r) =>
              r.url().includes('hooks.zapier.com') &&
              r.request().method() === 'POST' &&
              r.status() === 200,
            { timeout: 120000 }
          );
          await submit.click();
          const zapRes = await zapierOk;
          const raw = zapRes.request().postData();
          if (raw) {
            try {
              const payload = JSON.parse(raw);
              if (!payload.html || typeof payload.html !== 'string' || !payload.html.length) {
                errors.push('Zapier POST missing non-empty html');
              }
              const inv = payload.interview;
              if (!inv || typeof inv.variables !== 'object' || !Array.isArray(inv.formDataLog)) {
                errors.push('Zapier POST missing interview.variables or interview.formDataLog');
              }
            } catch (parseErr) {
              errors.push(`Zapier POST body was not valid JSON: ${parseErr.message}`);
            }
          } else {
            errors.push('Zapier POST had no body');
          }
          await page.waitForSelector('#success-post-submit', { state: 'visible', timeout: 15000 });
          clickedSubmit = true;
        }
      } catch (e) {
        errors.push(`Submit: ${e.message}`);
        const snapshot = await collectInterviewSnapshot(page);
        const submitDiagnostics = await collectSubmitDiagnostics(page, dbg);
        return {
          success: false,
          steps: step,
          visited: visited.size,
          errors,
          snapshot,
          scenarioId: scenario.id,
          clickedSubmit: false,
          submitDiagnostics,
        };
      }
      const snapshot = await collectInterviewSnapshot(page);
      const thankYouOk = snapshot.submittedThankYouVisible === true;
      if (!thankYouOk) {
        errors.push('Post-submit thank-you panel did not appear');
      }
      const zapierPayloadFailed = errors.some((e) => e.startsWith('Zapier POST'));
      const submitOk = thankYouOk && !zapierPayloadFailed;
      let submitDiagnostics = null;
      if (!submitOk) {
        submitDiagnostics = await collectSubmitDiagnostics(page, dbg);
      }
      return {
        success: submitOk,
        steps: step,
        visited: visited.size,
        errors,
        snapshot,
        scenarioId: scenario.id,
        clickedSubmit,
        submitDiagnostics,
      };
    }

    if (state.errorText) {
      errors.push(`Step ${step}: ${state.errorText}`);
    }

    // Avoid acting on Yes/No before question copy is in the DOM (innerText can lag; textContent is usually ready)
    if (
      state.questionVisible &&
      state.radios.length > 0 &&
      !String(state.questionText || '').trim()
    ) {
      await page.waitForTimeout(100);
      step++;
      continue;
    }

    // Include history length + radio checked state so revisiting a screen with no text fields
    // (e.g. 07a Defendant SSN Yes/No) does not false-positive as an infinite loop.
    const radioSig = state.radios
      .map((r) => `${r.name}:${r.value}:${r.checked ? '1' : '0'}`)
      .join('|');
    const pageKey = `${state.currentPageName || state.docTitle}-h${
      state.pageHistoryLength ?? 0
    }-${state.inputs.map((i) => i.name).join(',')}-${state.inputs.map((i) => i.value).join(',')}-${radioSig}`;
    const inLoop = visited.has(pageKey) && visited.size > 10;
    if (inLoop && visited.size > 25) {
      errors.push(`Step ${step}: Loop detected at "${state.currentPageName || state.docTitle}"`);
      break;
    }
    visited.add(pageKey);

    let acted = false;

    // Fill text/date inputs
    for (const inp of state.inputs) {
      if (['text', 'tel', 'number', ''].includes(inp.type) && inp.name) {
        const val = getMockValue(inp.name, 'text');
        if (val && inp.value !== val) {
          try {
            await page.fill(`[name="${inp.name}"]`, val);
            acted = true;
          } catch {}
        }
      }
      if (inp.type === 'date' && inp.name) {
        const val = getMockValue(inp.name, 'datemdy');
        const iso = val.split('/').length === 3
          ? `${val.split('/')[2]}-${val.split('/')[0].padStart(2, '0')}-${val.split('/')[1].padStart(2, '0')}`
          : val;
        try {
          await page.fill(`[name="${inp.name}"]`, iso);
          acted = true;
        } catch {}
      }
      if ((inp.type === 'select-one' || inp.nodeName === 'SELECT') && inp.options?.length > 1) {
        try {
          const mockVal = getMockValue(inp.name, 'text');
          const nm = (inp.name || '').toLowerCase();
          const altVal = nm.includes('state') ? MOCK.stateShort : null;
          let opt = inp.options.find(o =>
            o.value === mockVal || (o.text || '').includes(mockVal) ||
            (altVal && (o.value === altVal || (o.text || '').includes(altVal)))
          );
          if (!opt) opt = inp.options.find(o => o.value && String(o.value).trim() !== '');
          if (!opt) opt = inp.options[1];
          if (opt?.value) {
            await page.selectOption(`[name="${inp.name}"]`, opt.value);
            acted = true;
          }
        } catch {}
      }
    }

    // Click radio: one choice per unique name (intro has two Yes/No groups; a single .find() left one unset).
    if (state.radios.length > 0) {
      const byName = new Map();
      for (const r of state.radios) {
        if (!r.name) continue;
        if (!byName.has(r.name)) byName.set(r.name, []);
        byName.get(r.name).push(r);
      }
      let groupIndex = 0;
      let clickedButtonChoice = false;
      for (const [radioName, radios] of byName) {
        const pickYes = pickYesForRadioGroup({
          step,
          questionText: state.questionText || '',
          inLoop,
          radioName,
          groupIndex,
          scenario,
        });
        groupIndex++;
        const v = (x) => String(x || '').toLowerCase();
        // button_choice uses index values "0","1",… — do not treat "1"/"0" as boolean Yes/No
        let yesRadio;
        let noRadio;
        if (radioName === 'button_choice') {
          yesRadio = radios.find((r) => /^yes$/i.test((r.label || '').trim()));
          noRadio = radios.find((r) => /^no$/i.test((r.label || '').trim()));
          if (!yesRadio && radios.length) yesRadio = radios[0];
          if (!noRadio && radios.length > 1) noRadio = radios[1];
        } else {
          yesRadio = radios.find(
            (r) => v(r.value) === 'true' || /^yes$/i.test((r.label || '').trim())
          );
          noRadio = radios.find(
            (r) => v(r.value) === 'false' || /^no$/i.test((r.label || '').trim())
          );
        }
        let target =
          pickYes && yesRadio ? yesRadio : !pickYes && noRadio ? noRadio : radios[0];
        // 09a: values are none | have_property — default pick landed on "none"; we need property path for saved data
        if (radioName === 'Marital property none MC') {
          const haveProp = radios.find((r) => r.value === 'have_property');
          if (haveProp) target = haveProp;
        }
        try {
          await page.click(`input[name="${target.name}"][value="${target.value}"]`);
          acted = true;
          if (radioName === 'button_choice') clickedButtonChoice = true;
        } catch {}
      }
      if (clickedButtonChoice) {
        await page.waitForTimeout(BUTTON_CHOICE_WAIT_MS);
      }
    }

    // 09a: ensure "have marital property" is selected (radio loop can miss; snapshot must not stay "none")
    if (state.currentPageName === '09a-Explain no marital property') {
      try {
        await page.locator('input[name="Marital property none MC"][value="have_property"]').check();
        acted = true;
      } catch {}
    }

    // BL-01: child rows use data-child-field (no name=); fill after "Yes" so repeater is visible
    if (state.currentPageName === 'BL-01-Children information') {
      const yesOnChildren = await page
        .locator('input[name="Brodsky minor children MC"][value="yes"]')
        .isChecked()
        .catch(() => false);
      if (yesOnChildren) {
        try {
          await page.fill(
            '.children-repeater .children-repeater-row [data-child-field="name"]',
            `${MOCK.first} Jr ${MOCK.last}`
          );
          await page.fill(
            '.children-repeater .children-repeater-row [data-child-field="ssn"]',
            MOCK.ssn
          );
          await page.fill('.children-repeater .children-repeater-row [data-child-field="dob"]', '2015-06-01');
          await page.fill(
            '.children-repeater .children-repeater-row [data-child-field="address"]',
            MOCK.address
          );
          acted = true;
        } catch {}
      }
    }

    // Click primary button (Continue, Agree, etc.)
    const continueBtn = state.buttons.find(
      (b) =>
        /continue|agree|next|submit|get document|download your form/i.test(b.text) &&
        !/learn more/i.test(b.text)
    );
    if (continueBtn) {
      try {
        await page.click(`button:has-text("${continueBtn.text.split('→')[0].trim()}")`);
        acted = true;
      } catch {
        try {
          await page.click('button.btn-primary');
          acted = true;
        } catch {}
      }
    }

    if (!acted && state.buttons.length > 0) {
      const btn = state.buttons.find(b => !/back|learn/i.test(b.text));
      if (btn) {
        try {
          await page.click(`button:has-text("${btn.text.slice(0, 20)}")`);
          acted = true;
        } catch {}
      }
    }

    step++;
  }

  return { success: false, steps: step, visited: visited.size, errors, scenarioId: scenario.id };
}

async function launchBrowser(headless) {
  const opts = { headless };
  if (process.platform === 'darwin') {
    try {
      return await chromium.launch({ ...opts, channel: 'chrome' });
    } catch (e) {
      const msg = e.message || String(e);
      if (!/Executable doesn|doesn't exist|browserType\.launch/i.test(msg)) throw e;
      console.warn('Chrome channel failed; trying bundled Chromium:', msg.split('\n')[0]);
    }
  }
  return await chromium.launch(opts);
}

async function main() {
  const headless = process.env.HEADLESS === '1';
  console.log(`Launching browser (${headless ? 'headless' : 'headed - you will see the window'})...`);
  const browser = await launchBrowser(headless);
  console.log('Browser launched.');
  const scenarios = [DEFAULT_SCENARIO];
  console.log('Running 1 scenario (single path — form persistence + submit).');
  const results = [];

  for (const scenario of scenarios) {
    console.log(`\n--- Scenario: ${scenario.id} ---`);
    const context = await browser.newContext();
    const page = await context.newPage();
    const submitDebug = createSubmitDebugBuffer();
    attachSubmitDebugListeners(page, submitDebug);

    try {
      console.log(`  Loading ${BASE_URL}...`);
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 10000 });
      // Wait for engine to init (module loads, then shows question-card or success-card)
      await Promise.race([
        page.waitForSelector('#question-card', { state: 'visible', timeout: 15000 }),
        page.waitForSelector('#success-card', { state: 'visible', timeout: 15000 }),
      ]);
      await page.waitForTimeout(100);

      const result = await runStrategy(page, scenario, submitDebug);
      if (result.success && result.snapshot) {
        const recErr = validateFormDataRecording(result.snapshot);
        if (recErr) {
          result.success = false;
          result.errors.push(`Recording check: ${recErr}`);
        }
      }
      results.push({ scenarioId: scenario.id, ...result });
      console.log(
        `Scenario "${scenario.id}": ${result.success ? 'SUCCESS' : 'FAIL'} (${result.steps} steps, ${result.visited} unique UI states)`
      );
      if (result.errors.length) {
        result.errors.forEach(e => console.log(`  ⚠ ${e}`));
      }
      if (!result.success && result.submitDiagnostics) {
        console.log('\n--- Submit diagnostics (engine + browser + Playwright) ---');
        console.log(JSON.stringify(result.submitDiagnostics, null, 2));
      }
      const submitLogPath = process.env.E2E_SUBMIT_DEBUG_LOG;
      if (submitLogPath && !result.success && result.submitDiagnostics) {
        try {
          fs.appendFileSync(
            submitLogPath,
            `\n${'='.repeat(60)}\n${new Date().toISOString()} ${scenario.id}\n${'='.repeat(60)}\n${JSON.stringify(
              result.submitDiagnostics,
              null,
              2
            )}\n`,
            'utf8'
          );
          console.log(`  Wrote submit diagnostics to ${submitLogPath}`);
        } catch (logErr) {
          console.warn(`  Could not write E2E_SUBMIT_DEBUG_LOG: ${logErr.message}`);
        }
      }
      if (result.success && result.snapshot) {
        const s = result.snapshot;
        const hist = (s.pageHistory || []).join(' → ');
        console.log(
          `  terminal=${s.currentPageName} vars=${s.variableCount} formDataLog=${s.formDataLogCount ?? 0} historyPages=${(s.pageHistory || []).length} thankYou=${s.submittedThankYouVisible}`
        );
        console.log(`  path: ${hist}`);
        if (process.env.E2E_FULL_SNAPSHOT === '1') {
          console.log(`\n--- Full interview state (${scenario.id}) ---`);
          console.log(JSON.stringify(result.snapshot, null, 2));
        }
      }
    } catch (e) {
      results.push({ scenarioId: scenario.id, success: false, error: e.message });
      console.log(`Scenario "${scenario.id}": ERROR - ${e.message}`);
    } finally {
      await context.close();
    }
  }

  await browser.close();

  const snapshotOut = process.env.E2E_SNAPSHOT_OUT;
  if (snapshotOut) {
    const payload = results
      .filter((r) => r.success && r.snapshot)
      .map((r) => ({
        scenarioId: r.scenarioId,
        snapshot: r.snapshot,
      }));
    fs.writeFileSync(snapshotOut, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`\nWrote ${payload.length} snapshot(s) to ${snapshotOut}`);
  }

  const passed = results.filter(r => r.success).length;
  const terminals = new Map();
  for (const r of results) {
    const t = r.success && r.snapshot ? r.snapshot.currentPageName : `(fail:${r.scenarioId})`;
    terminals.set(t, (terminals.get(t) || 0) + 1);
  }
  console.log(`\n--- Terminal page counts ---`);
  for (const [t, n] of [...terminals.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    console.log(`  ${t}: ${n}`);
  }
  console.log(`\n--- Summary: ${passed}/${results.length} scenarios reached SUCCESS ---`);
  process.exit(passed === results.length ? 0 : 1);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
