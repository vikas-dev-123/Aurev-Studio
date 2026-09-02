/**
 * Writes public/sitemap.xml from src/data/site.ts.
 *
 * The route table is the single source of truth for what exists, so the sitemap is
 * generated rather than maintained: add a route and re-run this, and the file can
 * never list a page that has been removed.
 *
 * Run: node scripts/generate-sitemap.cjs
 */
const fs = require('fs');
const path = require('path');
const { addHook } = require('pirates');
const { transform } = require('sucrase');

addHook(
  (code, filePath) =>
    transform(code, { transforms: ['typescript', 'imports'], filePath }).code,
  { exts: ['.ts'], ignoreNodeModules: true },
);

const root = path.join(__dirname, '..');
const { site, routes } = require(path.join(root, 'src/data/site.ts'));

/** Home first, then the pages that sell, then the pages that reassure. */
const WEIGHT = {
  '/': 1.0,
  '/services': 0.9,
  '/products': 0.9,
  '/industries': 0.8,
  '/ai': 0.8,
  '/work': 0.8,
  '/approach': 0.7,
  '/contact': 0.7,
  '/about': 0.6,
};

const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .map((route) => {
    const loc = `${site.origin}${route.path === '/' ? '/' : route.path}`;
    const priority = (WEIGHT[route.path] ?? 0.5).toFixed(1);
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const out = path.join(root, 'public', 'sitemap.xml');
fs.writeFileSync(out, xml, 'utf8');
console.log(`sitemap.xml written with ${routes.length} routes`);
