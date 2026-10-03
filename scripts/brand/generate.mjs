/**
 * Renders the social share card and the favicon / app-icon set into /public.
 *
 *   npm run brand:assets
 *
 * Uses a locally installed Chrome (or CHROMIUM_PATH=/path/to/chrome). Fonts are bundled in
 * scripts/brand/fonts, so no network is needed. The share card prints the domain from
 * VITE_SITE_URL in .env.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import { markSvg } from './mark.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const pub = (file) => resolve(root, 'public', file);

const env = Object.fromEntries(
  readFileSync(resolve(root, '.env'), 'utf8')
    .split('\n')
    .filter((line) => /^\s*[A-Z_]+\s*=/.test(line))
    .map((line) => line.split('=').map((part) => part.trim())),
);
const host = new URL(env.VITE_SITE_URL ?? 'https://navix.agency').host;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : { channel: 'chrome' },
);

async function renderHtml(html, size, path) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${html}`);
  const png = await page.screenshot({ path, omitBackground: true });
  await page.close();
  return png;
}

/** Packs PNG images into a .ico container (PNG-compressed entries, supported by every modern browser). */
function toIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

// Share card (Open Graph + Twitter)
const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.goto(`${pathToFileURL(resolve(root, 'scripts/brand/og.html')).href}?host=${encodeURIComponent(host)}`);
const loadedFamilies = await og.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([document.fonts.load('900 168px Outfit'), document.fonts.load('500 17px Inter')]);
  return [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, ''));
});
if (!loadedFamilies.includes('Outfit') || !loadedFamilies.includes('Inter')) {
  throw new Error(`Brand fonts failed to load (loaded: ${loadedFamilies.join(', ') || 'none'}).`);
}
await og.screenshot({ path: pub('og-image.png') });
await og.close();

// Icons
writeFileSync(pub('favicon.svg'), markSvg());
const icoPngs = [];
for (const size of [16, 32, 48]) icoPngs.push({ size, data: await renderHtml(markSvg({ radius: 12 }), size) });
writeFileSync(pub('favicon.ico'), toIco(icoPngs));
await renderHtml(markSvg({ radius: 0 }), 180, pub('apple-touch-icon.png'));
await renderHtml(markSvg(), 192, pub('icon-192.png'));
await renderHtml(markSvg(), 512, pub('icon-512.png'));
await renderHtml(markSvg({ radius: 0, inset: 0.24 }), 512, pub('icon-maskable-512.png'));

await browser.close();
console.log(`Brand assets written to /public (share card host: ${host})`);
