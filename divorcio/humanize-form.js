/**
 * Turn A2J-style variable names into plain-language labels for exports and formDataLog.
 * Suffixes: TE text, MC choice, TF yes/no, DA date, NU number (common LawHelp / A2J conventions).
 */

/** Shown next to exported state so readers know what the letters meant in raw variable names. */
export const A2J_VARIABLE_SUFFIX_MEANINGS = {
  TE: 'Text entry',
  MC: 'Multiple choice',
  TF: 'Yes / no (true/false)',
  DA: 'Date',
  NU: 'Number',
  'SP TE': 'Spanish text',
};

/** Numeric OPTION values from the questionnaire map to these labels (court-style coding). */
export const BRODSKY_EDUCATION_LABELS = {
  '0': 'Prefer not to say',
  '1': 'Grade school or less',
  '2': 'Some high school, no diploma',
  '3': 'High school graduate or GED',
  '4': "Some college or associate degree",
  '5': "Bachelor's degree",
  '6': 'Graduate or professional degree',
};

const SUFFIX_RULES = [
  [/\s+SP TE$/i, ' (Spanish text)'],
  [/\s+TE$/i, ' (text)'],
  [/\s+MC$/i, ' (choice)'],
  [/\s+TF$/i, ' (yes/no)'],
  [/\s+DA$/i, ' (date)'],
  [/\s+NU$/i, ' (number)'],
];

/**
 * Drop internal "Brodsky " name prefix from variable keys in user-facing labels.
 * Keeps "Brodsky Law …" intact if it ever appears as a label.
 * @param {string} s
 * @returns {string}
 */
function stripInternalBrodskyPrefix(s) {
  if (s == null || s === '') return s;
  return String(s)
    .replace(/^Brodsky\s+(?!Law\b)/i, '')
    .trim();
}

/**
 * @param {string} key
 * @returns {string}
 */
export function humanizeVariableKey(key) {
  if (key == null || key === '') return key;
  if (key === 'choice') return 'Selected option';
  let out = key;
  for (const [re, label] of SUFFIX_RULES) {
    if (re.test(out)) {
      out = out.replace(re, label);
      return stripInternalBrodskyPrefix(out);
    }
  }
  return stripInternalBrodskyPrefix(out);
}

/**
 * @param {unknown} v
 * @returns {unknown}
 */
export function humanizeValue(v) {
  if (v === 'true' || v === true) return 'Yes';
  if (v === 'false' || v === false) return 'No';
  if (typeof v === 'string' && (v.startsWith('[') || v.startsWith('{'))) {
    try {
      const p = JSON.parse(v);
      if (Array.isArray(p) && p.length > 0 && p[0] != null && typeof p[0] === 'object') {
        if (
          'name' in p[0] &&
          ('dob' in p[0] || 'address' in p[0] || 'ssn' in p[0])
        ) {
          return {
            children: p.map((child, i) => ({
              childNumber: i + 1,
              fullName: child.name,
              socialSecurityNumber: child.ssn,
              dateOfBirth: child.dob,
              homeAddress: child.address,
            })),
          };
        }
      }
    } catch {
      /* keep string */
    }
  }
  return v;
}

/**
 * @param {Record<string, unknown>} answers
 * @returns {Record<string, unknown>}
 */
export function humanizeAnswersObject(answers) {
  if (!answers || typeof answers !== 'object') return {};
  const out = {};
  for (const [k, v] of Object.entries(answers)) {
    let displayVal = humanizeValue(v);
    if (
      (k === 'Brodsky plaintiff education MC' || k === 'Brodsky defendant education MC') &&
      v != null &&
      String(v).trim() !== ''
    ) {
      const mapped = BRODSKY_EDUCATION_LABELS[String(v)];
      if (mapped) displayVal = mapped;
    }
    out[humanizeVariableKey(k)] = displayVal;
  }
  return out;
}

/**
 * Strip A2J suffix tokens for attorney-facing email (no " (choice)" jargon).
 * @param {string} rawKey — original variable name from the engine
 * @returns {string|null} label text, or null to omit (duplicate "choice" row)
 */
export function fieldLabelForEmail(rawKey) {
  if (rawKey == null || rawKey === '') return '';
  if (rawKey === 'choice') return null;
  let s = String(rawKey);
  s = s
    .replace(/\s+SP TE$/i, '')
    .replace(/\s+TE$/i, '')
    .replace(/\s+MC$/i, '')
    .replace(/\s+TF$/i, '')
    .replace(/\s+DA$/i, '')
    .replace(/\s+NU$/i, '');
  s = s.replace(/\s+/g, ' ').trim();
  s = stripInternalBrodskyPrefix(s);
  return s || '';
}

/**
 * Strip leading page ids from A2J page names: "00-Introduction" → "Introduction",
 * "BL-01-Children information" → "Children information", "13a-Marriage place" → "Marriage place".
 * @param {string} pageName
 * @returns {string}
 */
export function prettySectionTitle(pageName) {
  if (!pageName) return 'Section';
  const parts = String(pageName)
    .trim()
    .split('-')
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return String(pageName).trim();
  const [a, b, ...rest] = parts;
  /** e.g. BL + 01 + Children information */
  if (parts.length >= 3 && /^[A-Za-z]{1,4}$/.test(a) && /^\d+[a-z]?\.?$/i.test(b)) {
    return [...rest].join(' — ') || parts.join(' — ');
  }
  /** e.g. 00-Introduction, 13a-Marriage place, A01a-Part A Finished */
  if (/^\d+[a-z]?\.?(\d+\.)?$/i.test(a) || /^[A-Za-z]\d+[a-z]?$/i.test(a)) {
    return [b, ...rest].join(' — ');
  }
  return parts.join(' — ');
}

/**
 * @param {string} iso
 * @returns {string}
 */
export function formatSubmittedAtForEmail(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return iso;
  }
}

/**
 * Same as humanizeValue, then normalize loose yes/no strings for email readability.
 * @param {unknown} rawVal
 * @returns {unknown}
 */
function humanizeValueForEmail(rawVal) {
  const v = humanizeValue(rawVal);
  if (typeof v === 'string') {
    const t = v.trim().toLowerCase();
    if (t === 'yes') return 'Yes';
    if (t === 'no') return 'No';
  }
  return v;
}

/**
 * Override confusing A2J names / inverted TF semantics so labels match how questions read.
 * @param {string} rawKey
 * @param {unknown} rawVal
 * @returns {{ label: string, displayValue: unknown } | null} null = use default label + humanizeValueForEmail
 */
function emailFieldPresentation(rawKey, rawVal) {
  const key = String(rawKey).trim();

  if (key === 'Married abroad TF') {
    const abroad = rawVal === true || rawVal === 'true';
    return {
      label: 'Married in the United States',
      displayValue: abroad ? 'No — ceremony outside the U.S.' : 'Yes — ceremony in the U.S.',
    };
  }

  if (key === 'Marital property none MC') {
    return {
      label: 'Marital property',
      displayValue: humanizeValueForEmail(rawVal),
    };
  }

  if (key === 'Brodsky minor children MC') {
    return {
      label: 'Children from this marriage',
      displayValue: humanizeValueForEmail(rawVal),
    };
  }

  if (key === 'Brodsky children JSON TE') {
    return {
      label: 'Children (name, SSN, date of birth, address)',
      displayValue: humanizeValueForEmail(rawVal),
    };
  }

  if (key === 'Brodsky plaintiff education MC') {
    const mapped = BRODSKY_EDUCATION_LABELS[String(rawVal)];
    return {
      label: 'Your education level',
      displayValue: mapped || humanizeValueForEmail(rawVal),
    };
  }

  if (key === 'Brodsky defendant education MC') {
    const mapped = BRODSKY_EDUCATION_LABELS[String(rawVal)];
    return {
      label: "Spouse's education level",
      displayValue: mapped || humanizeValueForEmail(rawVal),
    };
  }

  if (key === 'Brodsky children other residence which child TE') {
    let disp = humanizeValueForEmail(rawVal);
    if (String(rawVal ?? '') === '__MULTIPLE__') disp = 'Multiple children';
    return {
      label: 'Other residence (last 5 years) — which child?',
      displayValue: disp,
    };
  }

  return null;
}

/**
 * @param {string} s
 * @returns {string}
 */
export function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Inline-styled value block for email clients (no reliance on &lt;style&gt;).
 * @param {unknown} v — already passed through humanizeValue when from raw answers
 * @returns {string}
 */
function formatValueInlineEmailHtml(v) {
  if (v === null || v === undefined) {
    return `<span style="color:#718096;">—</span>`;
  }
  if (typeof v === 'object' && v !== null && 'children' in v && Array.isArray(v.children)) {
    const rows = v.children
      .map(
        (c) =>
          `<tr>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;font-size:14px;color:#2d3748;">${escapeHtml(String(c.childNumber))}</td>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;font-size:14px;color:#2d3748;">${escapeHtml(c.fullName)}</td>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;font-size:14px;color:#2d3748;">${escapeHtml(c.socialSecurityNumber != null && String(c.socialSecurityNumber).trim() !== '' ? String(c.socialSecurityNumber) : '—')}</td>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;font-size:14px;color:#2d3748;">${escapeHtml(c.dateOfBirth)}</td>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;font-size:14px;color:#2d3748;">${escapeHtml(c.homeAddress)}</td>
          </tr>`
      )
      .join('');
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:8px 0 0 0;">
      <thead><tr>
        <th style="text-align:left;padding:8px 12px;background:#edf2f7;border:1px solid #cbd5e0;font-size:12px;font-weight:600;color:#2d3748;">#</th>
        <th style="text-align:left;padding:8px 12px;background:#edf2f7;border:1px solid #cbd5e0;font-size:12px;font-weight:600;color:#2d3748;">Child name</th>
        <th style="text-align:left;padding:8px 12px;background:#edf2f7;border:1px solid #cbd5e0;font-size:12px;font-weight:600;color:#2d3748;">SSN</th>
        <th style="text-align:left;padding:8px 12px;background:#edf2f7;border:1px solid #cbd5e0;font-size:12px;font-weight:600;color:#2d3748;">Date of birth</th>
        <th style="text-align:left;padding:8px 12px;background:#edf2f7;border:1px solid #cbd5e0;font-size:12px;font-weight:600;color:#2d3748;">Home address</th>
      </tr></thead><tbody>${rows}</tbody></table>`;
  }
  if (typeof v === 'object') {
    const lines = [];
    for (const [k, val] of Object.entries(v)) {
      const lbl = fieldLabelForEmail(k) || k.replace(/_/g, ' ');
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        const inner = Object.entries(val)
          .map(([ik, iv]) => `${ik}: ${iv !== null && typeof iv === 'object' ? '…' : String(iv)}`)
          .join('; ');
        lines.push(`${escapeHtml(lbl)}: ${escapeHtml(inner)}`);
      } else {
        lines.push(`${escapeHtml(lbl)}: ${escapeHtml(String(val))}`);
      }
    }
    const body = lines.length ? lines.join('<br/>') : '—';
    return `<div style="font-size:15px;line-height:1.55;color:#1a202c;">${body}</div>`;
  }
  const str = String(v);
  const pretty = prettifyScalarForEmail(str);
  return `<span style="font-size:15px;line-height:1.5;color:#1a202c;">${escapeHtml(pretty)}</span>`;
}

/** Readable labels for common internal MC values (snake_case / codes). */
function prettifyScalarForEmail(s) {
  const map = {
    have_property: 'Yes — marital property to divide',
    none: 'None',
    no_fault: 'No-fault (irretrievable breakdown)',
    plaintiff: 'Plaintiff',
    defendant: 'Defendant',
    complaint: 'Summons and complaint',
    '2 years': '2 years',
    about: 'Continue (about you and your spouse)',
    __MULTIPLE__: 'Multiple children',
  };
  return map[s] !== undefined ? map[s] : s;
}

/**
 * Attorney-facing HTML: readable section titles, plain-English field names (no A2J suffix labels),
 * inline styles for inbox clients. Does not repeat full on-screen question prose when field rows are shown (avoids
 * redundancy with labels). Omits duplicate "choice" rows and raw appendix/glossary.
 * @param {object} state
 * @param {{ title?: string, firmName?: string, tagline?: string }} [opts]
 * @returns {string}
 */
export function buildSubmissionHtml(state, opts = {}) {
  const title = opts.title || 'Divorce questionnaire — Brodsky Law PLLC';
  const firm = opts.firmName || 'Brodsky Law PLLC';
  const tagline = opts.tagline || 'New York divorce intake';
  const submittedIso = new Date().toISOString();
  const submittedReadable = formatSubmittedAtForEmail(submittedIso);
  const log = Array.isArray(state.formDataLog) ? state.formDataLog : [];

  const sectionBlocks = [];
  let sectionNum = 0;
  for (const entry of log) {
    const answers = entry.answers && typeof entry.answers === 'object' ? entry.answers : {};
    const otherThanChoice = Object.keys(answers).filter((k) => k !== 'choice');
    const rowParts = [];
    for (const [rawKey, rawVal] of Object.entries(answers)) {
      const override = emailFieldPresentation(rawKey, rawVal);
      let label;
      /** @type {unknown} */
      let val;
      if (override) {
        label = override.label;
        val = override.displayValue;
      } else {
        label = fieldLabelForEmail(rawKey);
        if (label == null && rawKey === 'choice' && otherThanChoice.length === 0) {
          label = 'Response';
        } else if (label == null) {
          continue;
        }
        val = humanizeValueForEmail(rawVal);
      }
      const inner = formatValueInlineEmailHtml(val);
      rowParts.push(`<tr>
          <td style="vertical-align:top;padding:12px 16px 12px 0;border-bottom:1px solid #edf2f7;width:38%;font-size:14px;font-weight:600;color:#2c5282;line-height:1.45;">${escapeHtml(label)}</td>
          <td style="vertical-align:top;padding:12px 0;border-bottom:1px solid #edf2f7;">${inner}</td>
        </tr>`);
    }
    if (rowParts.length === 0) {
      continue;
    }
    sectionNum += 1;
    const rows = rowParts.join('');
    const sectionTitle = prettySectionTitle(entry.pageName || `Screen ${sectionNum}`);
    sectionBlocks.push(`<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:28px;border-collapse:collapse;">
        <tr><td colspan="2" style="padding:0 0 8px 0;border-bottom:2px solid #2c5282;">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.06em;color:#718096;text-transform:uppercase;">Section ${sectionNum}</span><br/>
          <span style="font-size:18px;font-weight:600;color:#1a365d;line-height:1.3;">${escapeHtml(sectionTitle)}</span>
        </td></tr>
        ${rows}
      </table>`);
  }
  const sections =
    sectionBlocks.length > 0
      ? sectionBlocks.join('')
      : `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;color:#718096;padding:8px 0;">No answers were received.</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${escapeHtml(title)}</title>
<!--[if mso]><style type="text/css">table { border-collapse: collapse; }</style><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#edf2f7;-webkit-text-size-adjust:100%;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#edf2f7;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:linear-gradient(135deg,#1a365d 0%,#2c5282 100%);background-color:#1a365d;padding:28px 28px 24px 28px;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:600;color:#ffffff;line-height:1.2;">${escapeHtml(firm)}</div>
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;color:rgba(255,255,255,0.88);margin-top:8px;">${escapeHtml(tagline)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 8px 28px;border-bottom:1px solid #e2e8f0;">
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;font-weight:600;color:#718096;text-transform:uppercase;letter-spacing:0.05em;">Submission received</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#1a202c;margin-top:6px;line-height:1.4;">${escapeHtml(submittedReadable)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px 8px 28px;">
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.6;color:#2d3748;">
                Below are the answers your client submitted through the online questionnaire.
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 32px 28px;">
              ${sections}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px 28px;background-color:#f7fafc;border-top:1px solid #e2e8f0;">
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;line-height:1.5;color:#718096;">
                This email was sent automatically when your client submitted the Brodsky Law PLLC divorce questionnaire.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * @param {string} html
 * @param {number} [maxLen]
 * @returns {string}
 */
export function stripHtmlToPlainText(html, maxLen = 4000) {
  const t = String(html).replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const plain = t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.length > maxLen ? `${plain.slice(0, maxLen)}…` : plain;
}
