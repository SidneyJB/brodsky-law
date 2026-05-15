#!/usr/bin/env node
/**
 * Static edges from interview-data (button.next + GOTO in code).
 * Runtime paths also depend on variable state; this is an over-approximation for coverage planning.
 */
import { INTERVIEW_DATA } from '../interview-data.js';

const GOTO_RE = /GOTO\s+"([^"]+)"/gi;

/** Mirrors engine.js findAlternativePage for skipped/system targets so static BFS matches runtime jumps. */
const ENGINE_PAGE_ALIASES = {
  '00a-Firefox warning': '02a-Plaintiff 2 years residency',
  '01-Save & Exit': 'SUCCESS',
  EXIT: 'SUCCESS',
  FAIL: 'SUCCESS',
};

function resolveEdgeTarget(t) {
  let x = t;
  const seen = new Set();
  while (ENGINE_PAGE_ALIASES[x] && !seen.has(x)) {
    seen.add(x);
    x = ENGINE_PAGE_ALIASES[x];
  }
  return x;
}

function extractGotos(code) {
  if (!code || typeof code !== 'string') return [];
  const out = [];
  let m;
  const r = new RegExp(GOTO_RE.source, 'gi');
  while ((m = r.exec(code)) !== null) out.push(m[1]);
  return out;
}

const pages = INTERVIEW_DATA.pages || {};
const edges = [];
const byFrom = new Map();

for (const [pageName, page] of Object.entries(pages)) {
  const targets = new Set();
  for (const b of page.buttons || []) {
    if (b.next && String(b.next).trim()) targets.add(b.next);
  }
  for (const g of extractGotos(page.codeBefore)) targets.add(g);
  for (const g of extractGotos(page.codeAfter)) targets.add(g);
  for (const t of targets) {
    const resolved = resolveEdgeTarget(t);
    edges.push([pageName, resolved]);
    if (!byFrom.has(pageName)) byFrom.set(pageName, new Set());
    byFrom.get(pageName).add(resolved);
  }
}

const branching = [...byFrom.entries()]
  .filter(([, to]) => to.size > 1)
  .map(([name, to]) => ({ from: name, outDegree: to.size, to: [...to].sort() }))
  .sort((a, b) => b.outDegree - a.outDegree || a.from.localeCompare(b.from));

const first = INTERVIEW_DATA.meta?.firstPage || '00-Introduction';
/** Follow every static target (including names not in `pages` after skips/rewires). */
const reachableIds = new Set();
const q = [first];
while (q.length) {
  const p = q.pop();
  if (reachableIds.has(p)) continue;
  reachableIds.add(p);
  for (const t of byFrom.get(p) || []) q.push(t);
}

const terminalLike = new Set(['SUCCESS', 'EXIT', 'FAIL']);
const allIds = Object.keys(pages);
const reachableDefinedPages = [...reachableIds].filter((id) => pages[id]);
const extraIds = [...reachableIds].filter((id) => !pages[id]);
const unreachableFromStart = allIds.filter((id) => !reachableIds.has(id));

console.log(JSON.stringify({
  firstPage: first,
  pageCount: allIds.length,
  staticEdgeCount: edges.length,
  note: 'Edge targets resolve through ENGINE_PAGE_ALIASES (Firefox warn → 02a, etc.). Runtime GOTOs still depend on variables.',
  reachableIdCount: reachableIds.size,
  reachableDefinedPageCount: reachableDefinedPages.length,
  reachableNonPageIds: extraIds.sort(),
  unreachableDefinedPageCount: unreachableFromStart.length,
  branchingPagesCount: branching.length,
  topBranching: branching.slice(0, 40),
}, null, 2));
