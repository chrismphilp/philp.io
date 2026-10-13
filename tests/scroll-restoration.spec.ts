import { expect, test, type Page } from '@playwright/test';

// Cover narrow phones, landscape, both sides of the responsive breakpoints,
// tablets, desktop and wide screens. Heights matter when scroll is clamped.
const viewports = [
  [320, 568],
  [390, 844],
  [844, 390],
  [639, 800],
  [640, 800],
  [767, 1024],
  [768, 1024],
  [1023, 768],
  [1024, 768],
  [1279, 900],
  [1280, 900],
  [1440, 900],
  [2560, 1440],
].map(([width, height]) => ({ width, height }));

async function openArchive(page: Page, path: string) {
  await page.goto(path);
  await expect(page.locator('main article').first()).toBeVisible();
  // Wait for hydration so clicks test client-side navigation as well as history.
  await page.waitForFunction(() => window.history.state?.__NA === true);
  await page.evaluate(() => document.fonts.ready);
}

async function positionCard(page: Page, index: number) {
  const cards = page.locator('main article');
  // Also runs against the original infinite list, to demonstrate the regression.
  for (let attempt = 0; attempt < 5 && (await cards.count()) <= index; attempt++) {
    const previousCount = await cards.count();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(() => cards.count()).toBeGreaterThan(previousCount);
  }
  const link = cards.nth(index).locator('a');
  await link.evaluate((element) => element.scrollIntoView({ block: 'center' }));
  return link;
}

async function expectScroll(page: Page, y: number, tolerance = 1) {
  await expect
    .poll(async () => Math.abs((await page.evaluate(() => scrollY)) - y))
    .toBeLessThanOrEqual(tolerance);
}

for (const viewport of viewports) {
  test.describe(`${viewport.width}x${viewport.height}`, () => {
    test.use({ viewport });

    for (const [path, index] of [
      ['/', 16],
      ['/tech', 11],
      ['/misc', 16],
    ] as const) {
      test(`${path} restores older posts on Back and article on Forward`, async ({ page }) => {
        await openArchive(page, path);
        const link = await positionCard(page, index);
        const href = await link.getAttribute('href');
        const archiveY = await page.evaluate(() => scrollY);
        const cardTop = await link.evaluate((element) => element.getBoundingClientRect().top);
        expect(archiveY).toBeGreaterThan(0);

        await link.click();
        await expect(page).toHaveURL(href!);
        await expect(page.locator('.prose')).toBeVisible();
        // Fresh navigation still starts at the article's beginning.
        await expectScroll(page, 0);
        await page.evaluate(() => window.scrollTo(0, 500));
        const articleY = await page.evaluate(() => scrollY);
        expect(articleY).toBeGreaterThan(0);

        for (let traversal = 0; traversal < 2; traversal++) {
          await page.goBack();
          await expect(page).toHaveURL(path);
          await expectScroll(page, archiveY);
          await expect(link).toBeInViewport();
          expect(
            Math.abs(
              (await link.evaluate((element) => element.getBoundingClientRect().top)) -
                cardTop,
            ),
          ).toBeLessThanOrEqual(1);

          await page.goForward();
          await expect(page).toHaveURL(href!);
          await expectScroll(page, articleY);
        }
      });
    }
  });
}

test('restores a deep archive position after reload', async ({ page }) => {
  await openArchive(page, '/');
  await positionCard(page, 26);
  const y = await page.evaluate(() => scrollY);
  // WebKit's automation reload resets scroll even on a plain HTML control page;
  // location.reload exercises the browser's normal reload restoration.
  await Promise.all([
    page.waitForEvent('load'),
    page.evaluate(() => window.location.reload()),
  ]);
  await expectScroll(page, y);
});

test('restores Back after changing viewport while reading', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openArchive(page, '/');
  const link = await positionCard(page, 16);
  const href = await link.getAttribute('href');
  const y = await page.evaluate(() => scrollY);
  await link.click();
  await expect(page).toHaveURL(href!);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goBack();
  await expect(page).toHaveURL('/');
  await expectScroll(page, y);
});

test('a fresh archive visit starts at the top after a history restoration', async ({
  page,
}) => {
  await openArchive(page, '/');
  const link = await positionCard(page, 16);
  const href = await link.getAttribute('href');
  const y = await page.evaluate(() => scrollY);
  await link.click();
  await expect(page).toHaveURL(href!);
  await page.goBack();
  await expectScroll(page, y);
  await link.click();
  await expect(page).toHaveURL(href!);
  await page
    .getByRole('navigation', { name: 'Breadcrumb', exact: true })
    .getByRole('link', { name: 'Home', exact: true })
    .click();
  await expect(page).toHaveURL('/');
  await expectScroll(page, 0);
});

test('restores a long photo article after visiting an adjacent article', async ({ page }) => {
  await page.goto('/articles/china');
  await page.waitForFunction(() => window.history.state?.__NA === true);
  await page.evaluate(() => document.fonts.ready);
  const link = page.locator('.prose nav a').filter({ hasText: 'Previous' });
  await link.scrollIntoViewIfNeeded();
  // Let the photos in view finish loading before recording the reading position.
  await page.waitForFunction(() =>
    [...document.querySelectorAll<HTMLImageElement>('.prose img')]
      .filter((img) => {
        const rect = img.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < innerHeight;
      })
      .every((img) => img.complete && img.naturalWidth > 0),
  );
  const y = await page.evaluate(() => scrollY);
  expect(y).toBeGreaterThan(5000);
  const href = await link.getAttribute('href');
  await link.click();
  await expect(page).toHaveURL(href!);
  await expectScroll(page, 0);
  await page.goBack();
  await expect(page).toHaveURL('/articles/china');
  // Optimized photo dimensions can round differently from their placeholders.
  await expectScroll(page, y, 4);
  await expect(link).toBeInViewport();
});

test('heading anchors retain their native history behavior', async ({ page }) => {
  await page.goto('/articles/useful-typescript-features');
  await page.waitForFunction(() => window.history.state?.__NA === true);
  const link = page.locator('.prose h3 a.anchor').last();
  await link.scrollIntoViewIfNeeded();
  const y = await page.evaluate(() => scrollY);
  const hash = await link.getAttribute('href');
  await link.click();
  await expect(page).toHaveURL(`/articles/useful-typescript-features${hash}`);
  await page.goBack();
  await expect(page).toHaveURL('/articles/useful-typescript-features');
  await expectScroll(page, y);
});

test('older archive entries are available before JavaScript runs', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto(test.info().project.use.baseURL + '/');
    const link = page.locator('main article a').nth(26);
    await link.scrollIntoViewIfNeeded();
    await expect(link).toBeInViewport();
    const href = await link.getAttribute('href');
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  } finally {
    await context.close();
  }
});
