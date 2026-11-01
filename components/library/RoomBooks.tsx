'use client';

import Link from 'next/link';
import type { CSSProperties, FocusEvent, MouseEvent } from 'react';
import type { PostMeta } from '../../utils/mdxUtils';

export const bindings = [
  '#61382f',
  '#354b3c',
  '#6c532d',
  '#334451',
  '#53404c',
  '#754528',
  '#4e5034',
  '#47352a',
];
export const bookSlug = (post: PostMeta) => post.filePath.replace(/\.mdx?$/, '');
export const ROOM_CAPACITY = 48;

// Coordinates refer to the twelve empty bays in the room artwork.
const shelfBottoms = [13.1, 21.8, 30.5, 39.2, 47.9, 56.5];

export default function RoomBooks({
  posts,
  allPosts,
  onPull,
  onFocus,
}: {
  posts: PostMeta[];
  allPosts: PostMeta[];
  onPull: (event: MouseEvent<HTMLAnchorElement>, post: PostMeta) => void;
  onFocus: (event: FocusEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <nav className="room-books" aria-label="Books on the library shelves">
      {Array.from({ length: 12 }, (_, shelf) => {
        const volumes = posts.slice(
          Math.round((shelf * posts.length) / 12),
          Math.round(((shelf + 1) * posts.length) / 12),
        );
        return (
          <div
            key={shelf}
            className={`in-room-shelf ${shelf < 6 ? 'west-shelf' : 'east-shelf'}`}
            style={{ '--shelf-bottom': `${100 - shelfBottoms[shelf % 6]}%` } as CSSProperties}
          >
            {volumes.map((post) => {
              const index = allPosts.indexOf(post);
              return (
                <Link
                  key={post.filePath}
                  id={`post-${bookSlug(post)}`}
                  href={`/articles/${bookSlug(post)}`}
                  prefetch={false}
                  className="room-book"
                  onClick={(event) => onPull(event, post)}
                  onFocus={onFocus}
                  aria-label={`${post.data.title} — ${post.data.readingTime}`}
                  style={
                    {
                      '--binding': bindings[index % bindings.length],
                      '--spine-height': `${79 + ((index * 7) % 20)}%`,
                      '--spine-width': `${21 + ((index * 3) % 6)}%`,
                    } as CSSProperties
                  }
                >
                  <span className="spine-cap" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="spine-lettering" aria-hidden="true">
                    {post.data.title}
                  </span>
                  <span className="spine-ornament" aria-hidden="true">
                    ✧
                  </span>
                  <span className="spine-tooltip" aria-hidden="true">
                    <span>
                      {post.data.category} · {post.data.readingTime}
                    </span>
                    {post.data.title}
                    <small>Pull from the shelf ↗</small>
                  </span>
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
