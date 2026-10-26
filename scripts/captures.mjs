// Captures pleine page de chaque page à 390 px et 1440 px. Usage : npm run build && npm run captures
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const PORT = 4413;
const BASE = `http://localhost:${PORT}`;
const PAGES = [
  ['accueil', '/'],
  ['mentions-legales', '/mentions-legales/'],
  ['confidentialite', '/confidentialite/'],
  ['404', '/page-inexistante/'],
];
const TAILLES = [['mobile', 390, 844], ['desktop', 1440, 900]];

const serveur = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'preview', '--port', String(PORT)], { stdio: 'pipe' });
const attendre = async () => {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(BASE); if (r.ok) return; } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('astro preview ne répond pas');
};

try {
  await attendre();
  await mkdir('captures', { recursive: true });
  const browser = await chromium.launch();
  for (const [nomT, w, h] of TAILLES) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, locale: 'fr-FR', timezoneId: 'Europe/Paris' });
    const page = await ctx.newPage();
    for (const [nom, url] of PAGES) {
      await page.goto(BASE + url, { waitUntil: 'networkidle' });
      // Défile toute la page, puis revient en haut.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(700);
      const debord = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (debord > 0) console.warn(`⚠ ${nom}-${nomT} : débordement horizontal de ${debord}px`);
      await page.screenshot({ path: `captures/${nom}-${nomT}.png`, fullPage: true });
      console.log(`captures/${nom}-${nomT}.png`);
    }
    await ctx.close();
  }
  await browser.close();
} finally {
  serveur.kill();
}
