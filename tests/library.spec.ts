import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const published = fs
  .readdirSync('articles')
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => ({ file, data: matter(fs.readFileSync(path.join('articles', file))).data }))
  .filter(({ data }) => !data.draft);
const techCount = published.filter(({ data }) => data.category === 'Technology').length;

test('the entire website is the room, with real article links on its shelves', async ({
  page,
}) => {
  const errors: string[] = [];
  const media: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (/\.(m4a|mp3|wav)(\?|$)/.test(request.url())) media.push(request.url());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('The reading room');
  await expect(page.locator('.room-world .room-book')).toHaveCount(
    Math.min(published.length, 48),
  );
  await expect(
    page.locator('.library-welcome, .site-header, .library-footer, .bookshelf-section'),
  ).toHaveCount(0);
  await expect(page.locator('.room-background')).toHaveAttribute('alt', /snowy/i);
  await expect(page.locator('.window-snow i')).toHaveCount(18);
  expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThanOrEqual(
    page.viewportSize()!.height,
  );
  expect(media).toEqual([]);
  expect(errors).toEqual([]);
});

test('a shelf book pulls out, restores focus, and opens a reader inside the room', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Look at west shelves' }).click();
  const book = page.locator('.room-book').first();
  const href = await book.getAttribute('href');
  await book.click();
  const dialog = page.locator('.room-book-dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(book).toBeFocused();
  await book.press('Enter');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: 'Open this book' }).click();
  await expect(page).toHaveURL(new RegExp(`${href}/?$`));
  await expect(page.locator('.reader-surface .reading-page h1')).toBeVisible();
  await expect(page.locator('.immersive-room')).toHaveAttribute('inert', '');
  await expect(page.locator('.fire')).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('link', { name: 'Back to the room' }).click();
  await expect(page).toHaveURL(new RegExp(`#post-${href?.split('/').pop()}$`));
  await expect(book).toBeFocused();
  await expect(book).toBeInViewport();
  await expect(page.locator('.immersive-room')).not.toHaveAttribute('inert');
});

test('the card catalogue searches, filters, and locates the actual book', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Find a book' }).click();
  const dialog = page.getByRole('dialog', { name: 'The card catalogue.' });
  await expect(dialog.locator('.catalogue-entries li')).toHaveCount(published.length);
  await dialog.getByRole('button', { name: 'Technology', exact: true }).click();
  await expect(dialog.locator('.catalogue-entries li')).toHaveCount(techCount);
  await dialog.getByRole('button', { name: 'Life & everything', exact: true }).click();
  await expect(dialog.locator('.catalogue-entries li')).toHaveCount(
    published.length - techCount,
  );
  await dialog.getByRole('button', { name: 'All writing', exact: true }).click();
  await dialog.getByRole('searchbox', { name: 'Search the collection' }).fill('TypeScript');
  expect(await dialog.locator('.catalogue-entries li').count()).toBeGreaterThan(0);
  await dialog.getByRole('searchbox').fill('there-is-no-such-book');
  await expect(dialog.getByText('No books found.')).toBeVisible();
  await dialog.getByRole('button', { name: 'Show all books' }).click();
  const last = dialog.locator('.catalogue-entries li').last();
  const href = await last.getByRole('link').getAttribute('href');
  await last.getByRole('button').click();
  const book = page.locator(`.room-book[href="${href}"]`);
  await expect(dialog).not.toBeVisible();
  await expect(book).toBeFocused();
  await expect(book).toBeInViewport();
  expect((await book.boundingBox())!.width).toBeGreaterThan(25);
  await book.press('Enter');
  await expect(page.locator('.room-book-dialog')).toBeVisible();
});

test('scene controls pause motion, greet the dog, and play real audio only on demand', async ({
  page,
}) => {
  const audioRequests: string[] = [];
  await page.addInitScript(() => {
    const OriginalAudio = window.Audio;
    window.Audio = class extends OriginalAudio {
      constructor(src?: string) {
        super(src);
        (window as unknown as { fireplace: HTMLAudioElement }).fireplace = this;
      }
    };
  });
  page.on('request', (request) => {
    if (request.url().includes('fireplace.m4a')) audioRequests.push(request.url());
  });
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Sound off: play fireplace sounds' }),
  ).toHaveAttribute('aria-pressed', 'false');
  expect(audioRequests).toHaveLength(0);
  await page.getByRole('button', { name: 'Pause scene animation' }).click();
  await expect(page.locator('.dog-sprite')).toHaveCSS('animation-play-state', 'paused');
  await expect(page.locator('.window-snow i').first()).toHaveCSS(
    'animation-play-state',
    'paused',
  );
  await page.getByRole('button', { name: 'Resume scene animation' }).click();
  await page
    .getByRole('button', { name: 'Say a quiet hello to the sleeping Bernese Mountain Dog' })
    .click();
  await expect(page.getByRole('status')).toContainText('The librarian approves of you.');
  await expect(page.locator('.library-dog')).toHaveClass(/dog-awake/);
  await page.getByRole('button', { name: 'Sound off: play fireplace sounds' }).click();
  await expect(page.getByRole('button', { name: 'Sound on: mute fireplace' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  expect(audioRequests.length).toBeGreaterThan(0);
  const playing = () =>
    page.evaluate(
      () => !(window as unknown as { fireplace: HTMLAudioElement }).fireplace.paused,
    );
  await expect.poll(playing).toBe(true);
  await page.getByRole('slider', { name: 'Fireplace volume' }).fill('20');
  await expect(page.getByRole('slider')).toHaveValue('20');
  await page.getByRole('button', { name: 'Find a book' }).click();
  await page.locator('.catalogue-entries a').first().click();
  await expect(
    page.locator('.reader-surface').getByRole('button', { name: 'Sound on: mute fireplace' }),
  ).toBeVisible();
  await expect.poll(playing).toBe(true);
  await page.getByRole('link', { name: 'Back to the room' }).click();
  await expect(page.getByRole('slider', { name: 'Fireplace volume' })).toHaveValue('20');
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(playing).toBe(false);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(playing).toBe(true);
  await page.getByRole('button', { name: 'Sound on: mute fireplace' }).click();
  await expect.poll(playing).toBe(false);
});

test('the scenery can be explored with the place controls and mouse drag', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Look at west shelves' }).click();
  await expect(page.getByRole('button', { name: 'Look at west shelves' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.locator('.west-shelf').first()).toBeInViewport();
  await page.getByRole('button', { name: 'Look at east shelves' }).click();
  await expect(page.locator('.east-shelf').first()).toBeInViewport();
  if (!isMobile) {
    const before = await page.locator('.room-panorama').evaluate((node) => node.scrollLeft);
    await page.mouse.move(800, 800);
    await page.mouse.down();
    await page.mouse.move(1100, 800, { steps: 10 });
    await page.mouse.up();
    const after = await page.locator('.room-panorama').evaluate((node) => node.scrollLeft);
    expect(Math.abs(before - after)).toBeGreaterThan(50);
  }
  await page.getByRole('button', { name: 'Look at tea corner' }).click();
  await page.getByRole('button', { name: 'Enjoy a cup of tea' }).click();
  await expect(page.getByRole('status')).toContainText('Earl Grey. Still warm.');
  await page.getByRole('button', { name: 'Look at snowfall' }).click();
  await expect(page.locator('.window-snow')).toBeInViewport();
});

test('reduced motion is respected and reader theme persists', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.dog-sprite')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.fire')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.window-snow')).not.toBeVisible();
  await page.goto('/articles/useful-typescript-features');
  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await expect(page.locator('html')).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/light/);
});

test('all routes and dialogs fit a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  for (const route of [
    '/',
    '/tech',
    '/misc',
    '/articles/useful-typescript-features',
    '/quotes',
  ]) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
      `Overflow on ${route}`,
    ).toBe(false);
    if (route !== '/')
      expect(
        await page
          .locator('.reader-surface')
          .evaluate((node) => node.scrollWidth > node.clientWidth),
        `Reader overflow on ${route}`,
      ).toBe(false);
  }
  await page.goto('/tech');
  await expect(page.locator('.book-link')).toHaveCount(techCount);
  await page.goto('/misc');
  await expect(page.locator('.book-link')).toHaveCount(published.length - techCount);
  await page.goto('/');
  await page.getByRole('button', { name: 'Find a book' }).click();
  const dialog = page.locator('.catalogue-dialog');
  expect(await dialog.evaluate((node) => node.scrollWidth > node.clientWidth)).toBe(false);
  await page.getByRole('button', { name: 'Close catalogue' }).click();
  await page.setViewportSize({ width: 844, height: 390 });
  await page.getByRole('button', { name: 'Look at west shelves' }).click();
  await page.locator('.room-book').first().click();
  await expect(page.getByRole('link', { name: 'Open this book' })).toBeVisible();
});

test('touch navigation and reading remain usable on small phones in either orientation', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'Touch flow is covered in the iOS and Android projects.');
  test.setTimeout(60_000);
  for (const [width, height] of [
    [320, 568],
    [360, 640],
    [390, 844],
    [568, 320],
    [667, 375],
    [740, 360],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    for (const name of [
      'snowfall',
      'west shelves',
      'fireside',
      'east shelves',
      'tea corner',
    ]) {
      const control = page.getByRole('button', { name: `Look at ${name}` });
      // A visible center alone misses controls clipped by the short landscape dock.
      await expect(control).toBeInViewport({ ratio: 1 });
      await control.tap();
      await expect(control).toHaveAttribute('aria-pressed', 'true');
    }
    const catalogue = page.getByRole('button', { name: 'Find a book' });
    await expect(catalogue).toBeInViewport({ ratio: 1 });
    expect((await catalogue.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await catalogue.tap();
    await page.getByRole('searchbox').fill('TypeScript');
    const entry = page.locator('.catalogue-entries li').first();
    const href = await entry.getByRole('link').getAttribute('href');
    await entry.getByRole('button').tap();
    const book = page.locator(`.room-book[href="${href}"]`);
    await expect(book).toBeInViewport({ ratio: 1 });
    expect((await book.boundingBox())!.width).toBeGreaterThanOrEqual(40);
    await book.tap();
    await page.getByRole('link', { name: 'Open this book' }).tap();
    await expect(page.locator('.reading-page h1')).toBeVisible();
    const back = page.getByRole('link', { name: 'Back to the room' });
    await expect(back).toBeInViewport({ ratio: 1 });
    await back.tap();
    await expect(book).toBeInViewport({ ratio: 1 });
  }
});

test('native touch swipes pan the room and scroll the article', async ({
  page,
  isMobile,
  browserName,
}) => {
  test.skip(!isMobile || browserName !== 'chromium', 'Native gesture injection uses CDP.');
  const touch = await page.context().newCDPSession(page);
  async function swipe(from: { x: number; y: number }, to: { x: number; y: number }) {
    await touch.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [from],
    });
    for (let step = 1; step <= 8; step++) {
      await touch.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [
          {
            x: from.x + ((to.x - from.x) * step) / 8,
            y: from.y + ((to.y - from.y) * step) / 8,
          },
        ],
      });
      await page.waitForTimeout(16);
    }
    await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  }
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Look at fireside' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const panorama = page.locator('.room-panorama');
  const before = await panorama.evaluate((node) => node.scrollLeft);
  await swipe({ x: 330, y: 350 }, { x: 80, y: 350 });
  await expect
    .poll(() => panorama.evaluate((node) => node.scrollLeft))
    .toBeGreaterThan(before + 100);
  await expect(page.locator('.room-book-dialog')).not.toBeVisible();
  await page.goto('/articles/useful-typescript-features');
  await swipe({ x: 180, y: 650 }, { x: 180, y: 250 });
  await expect
    .poll(() => page.locator('.reader-surface').evaluate((node) => node.scrollTop))
    .toBeGreaterThan(100);
  await expect(page.getByRole('link', { name: 'Back to the room' })).toBeInViewport({
    ratio: 1,
  });
  await touch.detach();
});

test('all shelf links work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    serviceWorkers: 'block',
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  await expect(page.locator('.room-book')).toHaveCount(Math.min(published.length, 48));
  await page.locator('.room-book').first().click();
  await expect(page.locator('.reading-page h1')).toBeVisible();
  await page.getByRole('link', { name: 'Back to the room' }).click();
  await expect(page.locator('.room-book').first()).toBeInViewport();
  await context.close();
});

test('room, catalogue, preview and both reader themes pass accessibility checks', async ({
  page,
}) => {
  async function check() {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.goto('/');
  await check();
  await page.getByRole('button', { name: 'Look at west shelves' }).click();
  await page.locator('.room-book').first().click();
  await expect(page.locator('.room-book-dialog')).toHaveCSS('opacity', '1');
  await check();
  await page.getByRole('button', { name: 'Return book to shelf' }).click();
  await page.getByRole('button', { name: 'Find a book' }).click();
  await expect(page.locator('.catalogue-dialog')).toHaveCSS('opacity', '1');
  await check();
  await page.getByRole('button', { name: 'Close catalogue' }).click();
  await page.goto('/articles/useful-typescript-features');
  await check();
  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await check();
});

test('back navigation restores the same part of the room', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Look at east shelves' }).click();
  const last = page.locator('.room-book').last();
  await last.click();
  await page.getByRole('link', { name: 'Open this book' }).click();
  await expect(page.locator('.reading-page h1')).toBeVisible();
  await page.goBack();
  await expect(page.locator('.room-book-dialog')).not.toBeVisible();
  await expect(last).toBeInViewport();
});

test('audio failure leaves the room usable and offers a retry', async ({ page }) => {
  // Linux WebKit's media backend can retry outside Playwright's request routing.
  // Use a real missing resource so every backend exercises an actual load failure.
  await page.addInitScript(() => {
    const OriginalAudio = window.Audio;
    window.Audio = class extends OriginalAudio {
      constructor(src?: string) {
        super(
          src === '/library/fireplace.m4a' ? '/library/unavailable-fireplace-test.m4a' : src,
        );
      }
    };
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Sound off: play fireplace sounds' }).click();
  await expect(page.locator('.fireplace-error')).toContainText(
    'Tap the sound button to try again.',
  );
  await expect(
    page.getByRole('button', { name: 'Sound off: play fireplace sounds' }),
  ).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Find a book' }).click();
  await expect(page.locator('.catalogue-dialog')).toBeVisible();
});
