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

test('the full archive is present, searchable, and filterable in either view', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Come in. Stay a while.');
  await expect(page.locator('.book-link')).toHaveCount(published.length);
  await page.getByRole('button', { name: 'Technology', exact: true }).click();
  await expect(page.locator('.book-link')).toHaveCount(techCount);
  await page.getByRole('button', { name: 'Life & everything', exact: true }).click();
  await expect(page.locator('.book-link')).toHaveCount(published.length - techCount);
  await page.getByRole('button', { name: 'All writing', exact: true }).click();
  await page.getByRole('searchbox', { name: 'Search the collection' }).fill('TypeScript');
  expect(await page.locator('.book-link').count()).toBeGreaterThan(0);
  await page.getByRole('button', { name: 'Show reading list' }).click();
  await expect(page.locator('.bookcase-list')).toBeVisible();
  await page.getByRole('searchbox').fill('there-is-no-such-book');
  await expect(page.getByText('That shelf is empty.')).toBeVisible();
  await page.getByRole('button', { name: 'Show all books' }).click();
  await expect(page.locator('.book-link')).toHaveCount(published.length);
  expect(errors).toEqual([]);
});

test('a book can be opened, dismissed, read, and returned to its shelf', async ({ page }) => {
  await page.goto('/');
  const book = page.locator('.book-link').first();
  const href = await book.getAttribute('href');
  await book.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(book).toBeFocused();
  await book.press('Enter');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('link', { name: 'Open this book' }).click();
  await expect(page).toHaveURL(new RegExp(`${href}/?$`));
  await expect(page.locator('.reading-page h1')).toBeVisible();
  await expect(page.locator('time')).toBeVisible();
  await page.getByRole('link', { name: 'All writing', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`#post-${href?.split('/').pop()}$`));
  await expect(page.locator(`#post-${href?.split('/').pop()}`)).toBeInViewport();
});

test('scene controls support quiet mode, sound, and greeting the dog', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Sound off: play fireplace sounds' }),
  ).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Pause scene animation' }).click();
  await expect(page.locator('.dog-sprite')).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: 'Resume scene animation' }).click();
  await page
    .getByRole('button', { name: 'Say a quiet hello to the sleeping Bernese Mountain Dog' })
    .click();
  await expect(
    page.getByText('A sleepy hello. You have been approved by the librarian.'),
  ).toBeVisible();
  await expect(page.locator('.library-dog')).toHaveClass(/dog-awake/);
  await page.getByRole('button', { name: 'Sound off: play fireplace sounds' }).click();
  await expect(page.getByRole('button', { name: 'Sound on: mute fireplace' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('button', { name: 'Sound on: mute fireplace' }).click();
  await expect(
    page.getByRole('button', { name: 'Sound off: play fireplace sounds' }),
  ).toHaveAttribute('aria-pressed', 'false');
  await page.locator('.library-footer').scrollIntoViewIfNeeded();
  await expect(page.locator('.reading-room')).toHaveClass(/room-resting/);
});

test('reduced motion is respected and both color themes remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.dog-sprite')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.fire')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await expect(page.locator('html')).toHaveClass(/light/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/light/);
});

test('all routes fit narrow screens and collection links remain correct', async ({ page }) => {
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
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow, `Horizontal overflow on ${route}`).toBe(false);
  }
  await page.goto('/tech');
  await expect(page.locator('.book-link')).toHaveCount(techCount);
  await page.goto('/misc');
  await expect(page.locator('.book-link')).toHaveCount(published.length - techCount);
});

test('all books and articles remain reachable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    serviceWorkers: 'block',
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  await expect(page.locator('.book-link')).toHaveCount(published.length);
  await page.locator('.book-link').first().click();
  await expect(page.locator('.reading-page h1')).toBeVisible();
  await context.close();
});

test('the library, book preview, and reading page pass accessibility checks', async ({
  page,
}) => {
  async function check() {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.goto('/');
  await check();
  await page.locator('.book-link').first().click();
  await expect(page.getByRole('dialog')).toHaveCSS('opacity', '1');
  await check();
  await page.getByRole('button', { name: 'Return book to shelf' }).click();
  await page.getByRole('button', { name: 'Toggle color theme' }).click();
  await check();
  await page.goto('/articles/useful-typescript-features');
  await check();
});

test('back navigation restores the deep archive position', async ({ page }) => {
  await page.goto('/');
  const lastBook = page.locator('.book-link').last();
  await lastBook.click();
  await page.getByRole('link', { name: 'Open this book' }).click();
  await expect(page.locator('.reading-page h1')).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(lastBook).toBeInViewport();
});
