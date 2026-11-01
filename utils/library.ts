import type { PostMeta } from './mdxUtils';

export const ROOM_CAPACITY = 24;
export const bindings = ['#72403f', '#3f6655', '#87652f', '#3f596d', '#665074', '#885432'];
export const bookSlug = (post: Pick<PostMeta, 'filePath'>) =>
  post.filePath.replace(/\.mdx?$/, '');

/** Only one bookcase is mounted, however large the published collection becomes. */
export function getLibraryPage<T>(posts: readonly T[], requestedPage = 0) {
  const pageCount = Math.max(1, Math.ceil(posts.length / ROOM_CAPACITY));
  const page = Math.max(
    0,
    Math.min(pageCount - 1, Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 0),
  );
  const start = page * ROOM_CAPACITY;
  return {
    page,
    pageCount,
    items: posts.slice(start, start + ROOM_CAPACITY),
    first: posts.length ? start + 1 : 0,
    last: Math.min(start + ROOM_CAPACITY, posts.length),
  };
}

export function findBookPage(posts: readonly Pick<PostMeta, 'filePath'>[], slug: string) {
  const index = posts.findIndex((post) => bookSlug(post) === slug);
  return index < 0 ? null : Math.floor(index / ROOM_CAPACITY);
}

/** A new post never changes the bindings of existing books. */
export function bookAppearance(post: Pick<PostMeta, 'filePath'>) {
  let hash = 2166136261;
  for (const character of bookSlug(post))
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  return { binding: bindings[hash % bindings.length], height: 78 + (hash % 19) };
}
