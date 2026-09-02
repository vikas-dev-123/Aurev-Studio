/**
 * SSR smoke render for every route.
 *
 * There is no browser in this environment, so this is how a page proves it can
 * mount at all: sucrase transpiles the TSX on require, React renders it to a
 * string, and any bad import, undefined data reference or illegal hook call
 * surfaces as a stack trace instead of a blank screen in the user's browser.
 *
 * Run: node scripts/ssr-smoke.cjs
 */
const fs = require('fs');
const path = require('path');
const Module = require('module');
const { addHook } = require('pirates');
const { transform } = require('sucrase');

// The app is built with the automatic JSX runtime, so no file imports React.
// sucrase's default register hook emits classic `React.createElement`, which would
// fail on every component here — so the hook is installed by hand instead.
addHook(
  (code, filePath) =>
    transform(code, {
      transforms: ['typescript', 'jsx', 'imports'],
      jsxRuntime: 'automatic',
      filePath,
    }).code,
  { exts: ['.ts', '.tsx'], ignoreNodeModules: true },
);

// Vite resolves extension-less imports; Node's CJS loader does not know about
// .ts/.tsx. Teach it, so `import { hueOf } from '../../lib/colors'` resolves here
// exactly as it will in the real build.
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  try {
    return resolveFilename.call(this, request, ...rest);
  } catch (error) {
    for (const ext of ['.ts', '.tsx', '/index.ts', '/index.tsx']) {
      try {
        return resolveFilename.call(this, request + ext, ...rest);
      } catch {
        /* try the next candidate */
      }
    }
    throw error;
  }
};

const { createElement: h } = require('react');
const { renderToString } = require('react-dom/server');

const root = path.join(__dirname, '..');
const { BrowserRouter } = require(path.join(root, 'src/lib/router.tsx'));

const ROUTES = [
  ['/', 'HomePage'],
  ['/services', 'ServicesPage'],
  ['/industries', 'IndustriesPage'],
  ['/products', 'ProductsPage'],
  ['/ai', 'AiPage'],
  ['/work', 'WorkPage'],
  ['/approach', 'ApproachPage'],
  ['/about', 'AboutPage'],
  ['/contact', 'ContactPage'],
  ['*', 'NotFoundPage'],
];

let failed = 0;
let skipped = 0;

for (const [route, name] of ROUTES) {
  const file = path.join(root, 'src/pages', `${name}.tsx`);
  if (!fs.existsSync(file)) {
    skipped += 1;
    console.log(`  skip  ${route.padEnd(12)} ${name}.tsx not created yet`);
    continue;
  }
  try {
    const Page = require(file)[name];
    if (typeof Page !== 'function') throw new Error(`${name} is not exported as a component`);
    const html = renderToString(h(BrowserRouter, null, h(Page)));
    const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
    if (html.length < 800) throw new Error(`suspiciously small render (${html.length} chars)`);
    console.log(`  ok    ${route.padEnd(12)} ${String(kb).padStart(6)} kB of markup`);
  } catch (error) {
    failed += 1;
    console.log(`  FAIL  ${route.padEnd(12)} ${error.message}`);
    if (process.env.VERBOSE) console.log(error.stack);
  }
}

console.log(`\n${ROUTES.length - skipped - failed} rendered, ${failed} failed, ${skipped} skipped`);
process.exit(failed > 0 ? 1 : 0);
