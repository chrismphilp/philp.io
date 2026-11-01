import { expect, test } from '@playwright/test';
import { bookAppearance, findBookPage, getLibraryPage, ROOM_CAPACITY } from '../utils/library';

for (const count of [0, 24, 25, 73, 1000]) {
  test(`${count} published posts remain reachable without overcrowding the shelves`, () => {
    const posts = Array.from({ length: count }, (_, index) => ({
      filePath: `post-${index}.mdx`,
    }));
    const first = getLibraryPage(posts);
    expect(first.pageCount).toBe(Math.max(1, Math.ceil(count / ROOM_CAPACITY)));
    const collected: typeof posts = [];
    for (let page = 0; page < first.pageCount; page++) {
      const shelf = getLibraryPage(posts, page);
      expect(shelf.items.length).toBeLessThanOrEqual(ROOM_CAPACITY);
      collected.push(...shelf.items);
      for (const post of shelf.items)
        expect(findBookPage(posts, post.filePath.replace('.mdx', ''))).toBe(page);
    }
    expect(collected).toEqual(posts);
    expect(getLibraryPage(posts, -2).page).toBe(0);
    expect(getLibraryPage(posts, Number.NaN).page).toBe(0);
    expect(getLibraryPage(posts, 9999).page).toBe(first.pageCount - 1);
    expect(findBookPage(posts, 'missing')).toBeNull();
    if (!count) expect(first).toMatchObject({ first: 0, last: 0, items: [] });
  });
}

test('publishing a new post moves older books to the next bookcase without losing their identity', () => {
  const oldPosts = Array.from({ length: ROOM_CAPACITY }, (_, index) => ({
    filePath: `post-${index}.mdx`,
  }));
  const last = oldPosts.at(-1)!;
  const oldAppearance = bookAppearance(last);
  const posts = [{ filePath: 'newest.mdx' }, ...oldPosts];
  expect(getLibraryPage(posts).items[0]).toEqual(posts[0]);
  expect(getLibraryPage(posts, 1).items).toEqual([last]);
  expect(findBookPage(posts, last.filePath.replace('.mdx', ''))).toBe(1);
  expect(bookAppearance(posts.at(-1)!)).toEqual(oldAppearance);
});
