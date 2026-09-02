/**
 * The colour law and WCAG audit, run against the source rather than a screenshot.
 *
 * Section A parses src/lib/colors.ts and computes contrast for every tone: its ink,
 * its display ink, and the two derived text opacities (.text-dim 68%, .text-faint
 * 44%) composited over that tone's own background — which is where a flat bright
 * hue is most likely to fail AA.
 *
 * Section B greps the source for the things the law forbids: gradients, a brand
 * hue hardcoded in a component, and a block that owns no accessible name. It also
 * prints each page's tone sequence so a missing hard cut is visible.
 *
 * Run: node scripts/audit-color-law.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.join(import.meta.dirname, '..');
const read = (p) => readFileSync(path.join(root, p), 'utf8');

/* ── colour maths ─────────────────────────────────────────────── */

const rgb = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const [r, g, b] = rgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/** color-mix(in srgb, fg N%, transparent) over bg — what the eye actually gets. */
const composite = (fg, bg, alpha) => {
  const [f, b] = [rgb(fg), rgb(bg)];
  const mix = f.map((c, i) => Math.round(c * alpha + b[i] * (1 - alpha)));
  return `#${mix.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
};

/* ── section A: contrast ──────────────────────────────────────── */

const colorsSrc = read('src/lib/colors.ts');

const consts = Object.fromEntries(
  [...colorsSrc.matchAll(/export const (\w+) = '(#[0-9A-Fa-f]{6})'/g)].map((m) => [m[1], m[2]]),
);
const hex = (raw) => (raw.startsWith('#') ? raw : consts[raw]);

const TONE_RE =
  /'?([a-z-]+)'?:\s*\{\s*hue:\s*'(\w+)',\s*bg:\s*'?(#[0-9A-Fa-f]{6}|\w+)'?,\s*fg:\s*'?(#[0-9A-Fa-f]{6}|\w+)'?,\s*displayFg:\s*'?(#[0-9A-Fa-f]{6}|\w+|null)'?/g;

const tones = [...colorsSrc.matchAll(TONE_RE)].map(([, tone, hue, bg, fg, displayFg]) => ({
  tone,
  hue,
  bg: hex(bg),
  fg: hex(fg),
  displayFg: displayFg === 'null' ? null : hex(displayFg),
}));

/** Derived utilities, read out of globals.css so this can never drift from the CSS. */
const cssSrc = read('src/styles/globals.css');

/** Per-tone alpha overrides: [data-tone='pink'] { --a-dim: 86%; ... } */
function alphasFor(tone) {
  const base = /\[data-tone\]\s*\{([\s\S]*?)\}/.exec(cssSrc)?.[1] ?? '';
  const block =
    new RegExp(`\\[data-tone='${tone}'\\]\\s*\\{([\\s\\S]*?)\\}`).exec(cssSrc)?.[1] ?? '';
  const pick = (name) => {
    const re = new RegExp(`--a-${name}:\\s*(\\d+(?:\\.\\d+)?)%`);
    const hit = re.exec(block) ?? re.exec(base);
    return hit ? Number(hit[1]) / 100 : null;
  };
  return { dim: pick('dim'), faint: pick('faint'), ruleStrong: pick('rule-strong') };
}

/**
 * `.text-dim` and `.text-faint` carry small text, so both are held to 4.5:1.
 * `.rule-strong` is the only border an outline button or an unchecked chip has,
 * which makes it a UI component boundary under WCAG 1.4.11 — 3:1.
 */
const DERIVED = [
  { name: '.text-dim', key: 'dim', min: 4.5 },
  { name: '.text-faint', key: 'faint', min: 4.5 },
  { name: '.rule-strong', key: 'ruleStrong', min: 3 },
];

let failures = 0;
let warnings = 0;

console.log(`\nCONTRAST — ${tones.length} tones parsed from src/lib/colors.ts\n`);

for (const { tone, bg, fg, displayFg } of tones) {
  const body = contrast(fg, bg);
  const bodyOk = body >= 4.5;
  if (!bodyOk) failures += 1;
  console.log(
    `  ${bodyOk ? 'PASS' : 'FAIL'}  ${tone.padEnd(12)} ink ${fg} on ${bg}  ${body.toFixed(2)}:1  (needs 4.5)`,
  );

  if (displayFg) {
    const large = contrast(displayFg, bg);
    const ok = large >= 3;
    if (!ok) failures += 1;
    console.log(
      `  ${ok ? 'PASS' : 'FAIL'}  ${''.padEnd(12)} displayFg ${displayFg}  ${large.toFixed(2)}:1  (large text, needs 3.0)`,
    );
  }

  const alphas = alphasFor(tone);
  for (const { name, key, min } of DERIVED) {
    const alpha = alphas[key];
    if (alpha === null) {
      failures += 1;
      console.log(`  FAIL  ${''.padEnd(12)} ${name} has no alpha in globals.css`);
      continue;
    }
    const mixed = composite(fg, bg, alpha);
    const ratio = contrast(mixed, bg);
    const ok = ratio >= min;
    if (!ok) failures += 1;
    console.log(
      `  ${ok ? 'PASS' : 'FAIL'}  ${''.padEnd(12)} ${name.padEnd(12)} ${String(Math.round(alpha * 100)).padStart(3)}% → ${mixed}  ${ratio.toFixed(2)}:1  (needs ${min.toFixed(1)})`,
    );
  }
  console.log('');
}

/* ── section B: the law, read out of the source ───────────────── */

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(path.join(root, dir))) {
    const rel = `${dir}/${entry}`;
    if (statSync(path.join(root, rel)).isDirectory()) walk(rel);
    else if (/\.(ts|tsx|css)$/.test(entry)) files.push(rel);
  }
})('src');

const source = new Map(files.map((f) => [f, read(f)]));

const BRAND_HEX = /#(?:F4D93E|E6C42B|2FD673|1FB85F|FF6FA0|F1508A)/gi;
const HUE_OF_HEX = {
  f4d93e: 'yellow',
  e6c42b: 'yellow',
  '2fd673': 'green',
  '1fb85f': 'green',
  ff6fa0: 'pink',
  f1508a: 'pink',
};
const BRAND_CLASS = /\b(?:bg|text|border|fill|stroke|from|via|to)-(?:yellow|green|pink)\b/g;
const GRADIENT = /(?:linear|radial|conic)-gradient|bg-gradient-to-/g;

/** colors.ts owns the hexes; the config and token layer are allowed to name them. */
const PALETTE_OWNERS = new Set([
  'src/lib/colors.ts',
  'src/styles/globals.css',
  'src/components/navigation/Logomark.tsx',
]);

const problems = [];
const lineOf = (text, index) => text.slice(0, index).split('\n').length;

/**
 * Read the props of a JSX tag without a fragile regex: walk forward from `<Name`
 * tracking brace depth and string state, and stop at the `>` that closes the tag.
 * A regex that stopped at the first `>` would mis-parse `pad={n > 2 ? 'lg' : 'md'}`.
 */
function tagProps(text, start) {
  let depth = 0;
  let quote = null;
  for (let i = start; i < text.length; i += 1) {
    const c = text[i];
    if (quote) {
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') quote = c;
    else if (c === '{') depth += 1;
    else if (c === '}') depth -= 1;
    else if (c === '>' && depth === 0) return text.slice(start, i);
  }
  return text.slice(start);
}

/**
 * A block only needs an accessible name when it renders as an element that can
 * become a landmark region. `as="li"` is a list item inside an already-named
 * list and takes its name from its own heading — an aria-label there would
 * override the item's content for some screen readers, so those are skipped.
 */
const LANDMARK = new Set(['section', 'aside', 'nav', 'form', 'main']);

for (const [file, text] of source) {
  if (!PALETTE_OWNERS.has(file)) {
    for (const m of text.matchAll(BRAND_HEX)) {
      problems.push([
        'FAIL',
        `${file}:${lineOf(text, m.index)}`,
        `brand hex ${m[0]} hardcoded — borrow the block's ink instead (var(--fg) / currentColor)`,
      ]);
    }
    for (const m of text.matchAll(BRAND_CLASS)) {
      problems.push([
        'FAIL',
        `${file}:${lineOf(text, m.index)}`,
        `${m[0]} paints a brand hue directly — a block's colour comes from its tone`,
      ]);
    }
  }

  for (const m of text.matchAll(GRADIENT)) {
    // A gradient is only a violation when it interpolates two brand hues; a scrim
    // in one colour or in the block's own ink is how the video overlay works.
    const window = text.slice(m.index, m.index + 320);
    const hues = new Set(
      [...window.matchAll(BRAND_HEX)].map((h) => HUE_OF_HEX[h[0].slice(1).toLowerCase()]),
    );
    problems.push([
      hues.size > 1 ? 'FAIL' : 'INFO',
      `${file}:${lineOf(text, m.index)}`,
      `${m[0]} — ${hues.size > 1 ? `interpolates ${[...hues].join(' → ')}` : 'single colour or neutral, allowed'}`,
    ]);
  }

  for (const m of text.matchAll(/<ColorBlock\b/g)) {
    const props = tagProps(text, m.index + m[0].length);
    const as = /\bas="([a-z]+)"/.exec(props)?.[1] ?? 'section';
    if (!LANDMARK.has(as)) continue;
    if (!/\blabel(ledBy)?=/.test(props))
      problems.push([
        'WARN',
        `${file}:${lineOf(text, m.index)}`,
        `<${as}> ColorBlock has no label or labelledBy — the section is unnamed to a screen reader`,
      ]);
  }
}

/* ── section C: the tone sequence of every page ───────────────── */

/** Ordered emissions per file: a literal tone, 'dynamic', or a child component. */
const emissions = new Map();
for (const [file, text] of source) {
  const list = [];
  for (const m of text.matchAll(/<ColorBlock\b[\s\S]*?>|<([A-Z]\w+)\b/g)) {
    if (m[0].startsWith('<ColorBlock')) {
      const tone = /\btone="([a-z-]+)"/.exec(m[0]);
      list.push({ kind: 'tone', value: tone ? tone[1] : 'dynamic' });
    } else {
      list.push({ kind: 'component', value: m[1] });
    }
  }
  emissions.set(file, list);
}

const fileFor = new Map();
for (const file of source.keys()) {
  const name = path.basename(file).replace(/\.tsx?$/, '');
  if (/^[A-Z]/.test(name)) fileFor.set(name, file);
}

function resolve(file, seen = new Set()) {
  if (seen.has(file)) return [];
  seen.add(file);
  const out = [];
  for (const item of emissions.get(file) ?? []) {
    if (item.kind === 'tone') out.push(item.value);
    else {
      const child = fileFor.get(item.value);
      if (child && child !== file) out.push(...resolve(child, seen));
    }
  }
  return out;
}

console.log('TONE SEQUENCE — every block a page renders, in order\n');

for (const file of [...source.keys()].filter((f) => f.startsWith('src/pages/'))) {
  const sequence = resolve(file);
  console.log(`  ${path.basename(file).replace('.tsx', '').padEnd(15)} ${sequence.join(' → ')}`);
  sequence.forEach((tone, i) => {
    if (i > 0 && tone === sequence[i - 1] && tone !== 'dynamic')
      problems.push([
        'WARN',
        path.basename(file),
        `two ${tone} blocks in a row — there is no visible cut between them`,
      ]);
  });
}

/* ── report ───────────────────────────────────────────────────── */

console.log('\nSTATIC CHECKS\n');
const order = { FAIL: 0, WARN: 1, INFO: 2 };
problems.sort((a, b) => order[a[0]] - order[b[0]]);
if (problems.length === 0) console.log('  nothing to report');
for (const [level, where, message] of problems) {
  if (level === 'FAIL') failures += 1;
  if (level === 'WARN') warnings += 1;
  console.log(`  ${level.padEnd(4)}  ${where.padEnd(46)} ${message}`);
}

console.log(`\n${failures} failure(s), ${warnings} warning(s)\n`);
process.exit(failures > 0 ? 1 : 0);
