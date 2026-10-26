// Génère public/og.png (1200x630) et public/apple-touch-icon.png (180x180). Usage : npm run og
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const font = (p) => `data:font/woff2;base64,${readFileSync(p).toString('base64')}`;
const anton = font('node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2');
const serif = font('node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2');
const css = `@font-face{font-family:A;src:url(${anton})}@font-face{font-family:S;src:url(${serif});font-weight:200 900}
*{margin:0;box-sizing:border-box}body{background:#c9cdd0;color:#151515;font-family:S;
background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.08) 0 1px,transparent 1px 3px)}`;

const carotte = `<svg viewBox="0 0 48 132" width="72"><path d="M2 4h30M24 4v10" stroke="#151515" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M24 14 L41 36 Q43 39 43 43 L43 89 Q43 93 41 96 L24 118 L7 96 Q5 93 5 89 L5 43 Q5 39 7 36 Z" fill="#C9241A" stroke="#151515" stroke-width="2.5" stroke-linejoin="round"/>${['T','A','B','A','C'].map((l,i)=>`<text x="21.5" y="${50+i*11}" text-anchor="middle" font-family="A" font-size="11" fill="#F3EBDA">${l}</text>`).join('')}</svg>`;

const og = `<style>${css}
.w{width:1200px;height:630px;display:grid;grid-template-columns:auto 1.3fr .95fr;align-items:center;padding:0 70px 0 56px;gap:40px}
.c{align-self:start}
h1{font-family:A;font-weight:400;font-size:84px;line-height:.98;text-transform:uppercase}
.s{margin-top:26px;font-size:27px;white-space:nowrap}
.a{background:#f3ebda;padding:46px 38px 34px;transform:rotate(1.6deg);box-shadow:0 12px 22px -14px rgba(0,0,0,.5);position:relative}
.a:before{content:'';position:absolute;top:-14px;left:30px;width:110px;height:30px;background:rgba(236,226,196,.8);transform:rotate(-6deg)}
.a h2{font-family:A;font-weight:400;color:#C9241A;font-size:38px;white-space:nowrap}
.h{font-family:A;font-size:76px;margin-top:14px;line-height:1}
.n{margin-top:18px;font-size:24px;border-top:3px dashed rgba(21,21,21,.35);padding-top:14px}
.n b{background:#F5D33A;padding:0 6px}
</style><div class="w"><div class="c">${carotte}</div><div><h1>Le café de la place, au cœur de Groslay</h1><p class="s">9 rue du Général Leclerc · 01 39 83 32 90</p></div>
<div class="a"><h2>Aujourd’hui au café</h2><p class="h">7h–20h</p><p class="n"><b>4,4/5</b> sur 70 avis Google</p></div></div>`;

const icon = `<style>${css}body{width:180px;height:180px;display:grid;place-items:center}</style>
<svg viewBox="0 0 64 64" width="150"><path d="M32 4 L46 20 Q48 22 48 25 L48 39 Q48 42 46 44 L32 60 L18 44 Q16 42 16 39 L16 25 Q16 22 18 20 Z" fill="#C9241A" stroke="#151515" stroke-width="3" stroke-linejoin="round"/></svg>`;

const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
await pg.setContent(og); await pg.waitForTimeout(400);
await pg.screenshot({ path: 'public/og.png' });
await pg.setViewportSize({ width: 180, height: 180 });
await pg.setContent(icon); await pg.waitForTimeout(300);
await pg.screenshot({ path: 'public/apple-touch-icon.png' });
await b.close();
console.log('og.png et apple-touch-icon.png générés');
