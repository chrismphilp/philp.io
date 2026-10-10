import { test, expect } from '@playwright/test';
import sharp from 'sharp';
import { getImagePlaceholder } from '../utils/imagePlaceholder';

const article = '/articles/top-of-the-film-reel';
const firstPhoto = 'article .progressive-image';

test('slow photos show an inline preview, then fade without moving the page', async ({
  page,
}) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const requests: string[] = [];
  const errors: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/articles/images/**', async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto(article, { waitUntil: 'domcontentloaded' });
    const wrapper = page.locator(firstPhoto).first();
    const photo = wrapper.locator('img');
    await photo.scrollIntoViewIfNeeded();
    await expect(wrapper).toHaveAttribute('data-state', 'loading');
    await expect(wrapper).toHaveCSS('background-image', /data:image\/webp;base64/);
    await expect(photo).toHaveCSS('opacity', '0');
    const before = await photo.boundingBox();
    await photo.evaluate((image: HTMLImageElement) => {
      image.addEventListener('animationend', (event) => {
        image.setAttribute('data-fade-duration', String(event.elapsedTime));
      });
    });
    await page.screenshot({ path: '.context/photo-loading.png', fullPage: false });
    release();
    await expect(wrapper).toHaveAttribute('data-state', 'complete');
    await expect(photo).toHaveCSS('opacity', '1');
    await expect(photo).toHaveAttribute('data-fade-duration', '0.2');
    await expect(wrapper).toHaveCSS('background-image', 'none');
    expect(await photo.boundingBox()).toEqual(before);
    await page.screenshot({ path: '.context/photo-loaded.png', fullPage: false });
    expect(requests.filter((url) => /-opt-10\./.test(url))).toEqual([]);
    expect(errors).toEqual([]);
  } finally {
    release();
  }
});

test('reduced motion reveals loaded images immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/articles/images/**', async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto(article, { waitUntil: 'domcontentloaded' });
  const wrapper = page.locator(firstPhoto).first();
  await wrapper.scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveAttribute('data-state', 'loading');
  release();
  await expect(wrapper).toHaveAttribute('data-state', 'complete');
  await expect(wrapper.locator('img')).toHaveCSS('animation-duration', '0s');
  await expect(wrapper).toHaveCSS('background-image', 'none');
});

test('avatar has an inline preview and the same short fade', async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/nextImageExportOptimizer/me.*', async (route) => {
    await gate;
    await route.continue();
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const avatar = page.locator('header .progressive-image').first();
  await expect(avatar).toHaveAttribute('data-state', 'loading');
  await expect(avatar).toHaveCSS('background-image', /data:image/);
  const before = await avatar.boundingBox();
  await avatar.locator('img').evaluate((image: HTMLImageElement) => {
    image.addEventListener('animationend', (event) => {
      image.setAttribute('data-fade-duration', String(event.elapsedTime));
    });
  });
  release();
  await expect(avatar).toHaveAttribute('data-state', 'complete');
  await expect(avatar.locator('img')).toHaveAttribute('data-fade-duration', '0.2');
  expect(await avatar.boundingBox()).toEqual(before);
});

test('build-time previews are tiny single frames and skip non-local images', async () => {
  for (const src of ['/articles/images/tram.jpg', '/articles/images/dog-hair.gif']) {
    const preview = await getImagePlaceholder(src);
    expect(preview).toMatch(/^data:image\/webp;base64,/);
    expect(preview!.length).toBeLessThan(300);
    const metadata = await sharp(Buffer.from(preview!.split(',')[1], 'base64')).metadata();
    expect(Math.max(metadata.width!, metadata.height!)).toBeLessThanOrEqual(10);
    expect(metadata.pages ?? 1).toBe(1);
  }
  for (const src of [
    'https://example.com/image.jpg',
    '//example.com/image.jpg',
    '/articles/images/git-merge.svg',
    '/../outside.png',
  ]) {
    expect(await getImagePlaceholder(src)).toBeUndefined();
  }
});

test('client navigation loads fresh previews and mobile photos fit the viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.locator('a[href="/misc"]').first().click();
  await page.waitForURL('**/misc');
  await page.locator(`a[href="${article}"]`).first().click();
  await page.waitForURL(`**${article}`);
  for (const photo of await page.locator('article .progressive-image').all()) {
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toHaveAttribute('data-state', 'complete');
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
  await page.goBack();
  await page.goForward();
  await expect(page.locator(firstPhoto).first()).toHaveAttribute('data-state', 'complete');
});

test('photos remain visible without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    serviceWorkers: 'block',
  });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}${article}`);
    for (const image of await page.locator('article img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
        )
        .toBe(true);
      await expect(image).toHaveCSS('opacity', '1');
    }
  } finally {
    await context.close();
  }
});

test('images loaded before hydration are never hidden or faded', async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/_next/static/**/*.js', async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto(article, { waitUntil: 'commit' });
    const wrapper = page.locator(firstPhoto).first();
    const image = wrapper.locator('img');
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);
    await expect(wrapper).toHaveAttribute('data-state', 'initial');
    await wrapper.evaluate((element) => {
      new MutationObserver((records) => {
        if (records.some((record) => record.oldValue === 'loading')) {
          element.setAttribute('data-was-hidden', 'true');
        }
      }).observe(element, {
        attributes: true,
        attributeFilter: ['data-state'],
        attributeOldValue: true,
      });
    });
    release();
    await expect(wrapper).toHaveAttribute('data-state', 'complete');
    await expect(wrapper).not.toHaveAttribute('data-was-hidden');
    await expect(image).toHaveCSS('opacity', '1');
  } finally {
    release();
  }
});

test('failed optimized images fall back to the original', async ({ page }) => {
  await page.route('**/articles/images/nextImageExportOptimizer/**', (route) => route.abort());
  await page.goto(article);
  const photo = page.locator('article img').first();
  await photo.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      photo.evaluate((img: HTMLImageElement) => ({
        src: img.currentSrc,
        loaded: img.complete && img.naturalWidth > 0,
      })),
    )
    .toEqual({ src: `${new URL(page.url()).origin}/articles/images/tram.jpg`, loaded: true });
  await expect(photo).toHaveCSS('opacity', '1');
});

test('a failed original exposes alt text rather than a permanent blur', async ({ page }) => {
  await page.route('**/articles/images/**', (route) => route.abort());
  await page.goto(article);
  const wrapper = page.locator(firstPhoto).first();
  await wrapper.scrollIntoViewIfNeeded();
  await expect(wrapper).toHaveAttribute('data-state', 'error');
  await expect(wrapper).toHaveCSS('background-image', 'none');
  await expect(wrapper.locator('img')).toHaveCSS('opacity', '1');
  await expect(wrapper.locator('img')).toHaveAttribute('alt', 'Tram');
});

test('SVG diagrams stay visible and narrow screens do not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/articles/git-functionality');
  for (const diagram of await page.locator('article img').all()) {
    await diagram.scrollIntoViewIfNeeded();
    await expect(diagram).toHaveCSS('opacity', '1');
    expect(
      await diagram.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
    ).toBe(true);
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
});
