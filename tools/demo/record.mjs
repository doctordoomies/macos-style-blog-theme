#!/usr/bin/env node
/*
 * Records the demo GIF shown at the top of the README.
 *
 *   bundle exec jekyll serve            # in another terminal
 *   cd tools/demo && npm install && node record.mjs [--base http://localhost:4000] [--out ../../docs/demo.gif]
 *
 * Needs Google Chrome (or set CHROME_CHANNEL=chromium after `npx playwright install chromium`)
 * and ffmpeg on PATH. It drives the desktop the way a visitor would — unlock, hover the
 * Dock, open a post from Finder, search with Spotlight, switch to Dark in System Settings,
 * minimize a window — records a video, then turns it into a looping GIF with ffmpeg.
 */
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readdir, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : fallback;
};
const BASE = arg('base', process.env.DEMO_BASE || 'http://localhost:4000');
const OUT = path.resolve(arg('out', path.join(HERE, '../../docs/demo.gif')));
const W = 1280;
const H = 800;
const FPS = Number(arg('fps', 12));
const WIDTH = Number(arg('width', 880));

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** Moves the mouse in small steps so the recording shows a real glide. */
async function glide(page, from, to, steps = 30, delay = 12) {
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    await page.mouse.move(from.x + (to.x - from.x) * e, from.y + (to.y - from.y) * e);
    await wait(delay);
  }
}

async function center(page, selector) {
  const box = await page.locator(`${selector} >> visible=true`).first().boundingBox();
  if (!box) throw new Error(`Not on screen: ${selector}`);
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

async function main() {
  if (spawnSync('ffmpeg', ['-version']).status !== 0) {
    throw new Error('ffmpeg was not found on PATH (macOS: brew install ffmpeg).');
  }
  const videoDir = await mkdtemp(path.join(os.tmpdir(), 'ephemeris-demo-'));
  const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    recordVideo: { dir: videoDir, size: { width: W, height: H } },
    colorScheme: 'light',
  });
  // Start from a clean, light desktop every time.
  await context.addInitScript(() => {
    if (sessionStorage.getItem('demo:started')) return;
    sessionStorage.setItem('demo:started', '1');
    try {
      localStorage.clear();
      localStorage.setItem('ephemeris:appearance', 'light');
    } catch {}
  });
  const page = await context.newPage();
  let mouse = { x: W / 2, y: H / 2 };
  const to = async (point, steps) => {
    await glide(page, mouse, point, steps);
    mouse = point;
  };
  // Glide to an element and click it. Measure again on arrival: the Dock magnifies
  // under the pointer and pushes icons aside, so the first measurement goes stale.
  const press = async (selector, steps = 30) => {
    await to(await center(page, selector), steps);
    await wait(150);
    const there = await center(page, selector);
    await to(there, 6);
    await page.mouse.click(there.x, there.y);
  };

  // 1. Lock screen, then unlock.
  await page.goto(BASE + '/');
  await wait(1800);
  await page.mouse.click(W / 2, H / 2);
  await wait(1200);

  // 2. Sweep across the Dock to show magnification.
  const bar = await page.locator('.dock__bar').boundingBox();
  const y = bar.y + bar.height * 0.6;
  await to({ x: bar.x + 20, y: H - 160 }, 25);
  await to({ x: bar.x + 20, y }, 10);
  await to({ x: bar.x + bar.width - 20, y }, 70);
  await to({ x: bar.x + bar.width * 0.3, y }, 40);

  // 3. Finder → open the first post.
  await press('[data-dock-finder]', 20);
  await wait(900);
  await press('.finder a[data-place="obsidian"]');
  await wait(700);
  await press('.finder .row__link:has-text("Welcome")');
  await wait(1600);
  await page.mouse.wheel(0, 500);
  await wait(900);

  // 4. Spotlight.
  await press('[data-open-spotlight]');
  await wait(500);
  await page.keyboard.type('markdown', { delay: 90 });
  await wait(1000);
  await page.keyboard.press('Escape');
  await wait(500);

  // 5. System Settings → Appearance → Dark, then back to Light.
  await press('[data-dock-settings]');
  await wait(1100);
  const pane = page.locator('.settings [role="option"]', { hasText: 'Appearance' }).first();
  if (await pane.count()) {
    const p = await pane.boundingBox();
    await to({ x: p.x + p.width / 2, y: p.y + p.height / 2 }, 25);
    await pane.click();
    await wait(600);
    for (const mode of ['dark', 'light']) {
      const tile = page.locator(`.settings [data-appearance="${mode}"]`).first();
      if (!(await tile.count())) break;
      const b = await tile.boundingBox();
      await to({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, 20);
      await tile.click();
      await wait(1300);
    }
  }

  // 6. Minimize the front window into the Dock (genie).
  const min = page.locator('.window.is-front .traffic__btn--min').first();
  if (await min.count()) {
    const b = await min.boundingBox();
    await to({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, 25);
    await min.click();
    await wait(1600);
  }
  await to({ x: W / 2, y: H / 2 - 100 }, 20);
  await wait(600);

  await page.close();
  await context.close();
  await browser.close();

  const [video] = (await readdir(videoDir)).filter((f) => f.endsWith('.webm'));
  await mkdir(path.dirname(OUT), { recursive: true });
  const filters = `fps=${FPS},scale=${WIDTH}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle`;
  const ff = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(videoDir, video), '-vf', filters, '-loop', '0', OUT], {
    stdio: 'inherit',
  });
  await rm(videoDir, { recursive: true, force: true });
  if (ff.status !== 0) throw new Error('ffmpeg failed');
  console.log(`Saved ${path.relative(process.cwd(), OUT)}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
