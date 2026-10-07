#!/usr/bin/env node
/*
 * Lightweight browser smoke test used by CI.
 *
 * Loads a built Ephemeris site, fails on uncaught page errors, and checks that
 * an app disabled through desktop.apps is absent from its main launch surfaces.
 *
 *   node smoke.mjs --base http://127.0.0.1:4173 --disabled music
 */
import { chromium } from 'playwright-core';

const arg = (name, fallback = '') => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : fallback;
};

const BASE = arg('base', 'http://127.0.0.1:4173');
const DISABLED = arg('disabled', 'default');
const selectors = {
  obsidian: '[data-dock-obsidian]',
  mail: '[data-dock-mail]',
  notes: '[data-dock-notes]',
  terminal: '[data-dock-terminal]',
  games: '[data-dock-games]',
  music: '[data-dock-music]',
};

const browser = await chromium.launch({
  channel: process.env.CHROME_CHANNEL || 'chrome',
  headless: true,
});

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];

  page.on('pageerror', (error) => {
    errors.push(error.stack || error.message || String(error));
  });

  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-dock-finder]');
  await page.waitForTimeout(400);

  if (DISABLED !== 'default') {
    const selector = selectors[DISABLED];
    if (!selector) throw new Error(`Unknown disabled app: ${DISABLED}`);

    if (await page.locator(selector).count()) {
      throw new Error(`${DISABLED} is disabled but ${selector} is still rendered`);
    }

    const finderApp = page.locator(`[data-open-app="${DISABLED}"]`);
    if (await finderApp.count()) {
      throw new Error(`${DISABLED} is disabled but still appears in Finder Applications`);
    }

    if (DISABLED === 'music' && (await page.locator('.cc__now').count())) {
      throw new Error('music is disabled but Control Center Now Playing is still rendered');
    }
  }

  // Exercise two core launch paths after module initialization. A module-load
  // exception should not be able to silently leave the desktop looking present
  // while its controls are dead.
  await page.evaluate(() => document.querySelector('[data-cc-button]')?.click());
  await page.waitForTimeout(100);
  const cc = page.locator('#menu-cc');
  if (!(await cc.count()) || (await cc.getAttribute('hidden')) !== null) {
    throw new Error('Control Center did not open');
  }

  await page.evaluate(() => document.querySelector('[data-dock-finder]')?.click());
  await page.waitForTimeout(100);

  if (errors.length) {
    throw new Error(`Uncaught browser error(s):\n${errors.join('\n\n')}`);
  }

  console.log(`Smoke test passed: ${DISABLED}`);
} finally {
  await browser.close();
}
