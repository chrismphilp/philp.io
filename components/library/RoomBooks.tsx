'use client';

import Link from 'next/link';
import type { CSSProperties, FocusEvent, MouseEvent } from 'react';
import type { PostMeta } from '../../utils/mdxUtils';
import { bookAppearance, bookSlug } from '../../utils/library';

// Shelf front edges in the 4:3 diorama. Books inherit each wall's perspective.
// Nine bays hold 24 volumes; further posts get another bookcase, never smaller targets.
const bays = [
  ...[19.3, 28.5, 37.7].map((y, row) => ({
    x: 32.7,
    y,
    width: 6.1,
    angle: -24,
    start: row * 2,
    count: 2,
  })),
  ...[16.5, 25.8, 35].map((y, row) => ({
    x: 39.8,
    y,
    width: 7.7,
    angle: 24,
    start: 6 + row * 2,
    count: 2,
  })),
  ...[31.5, 41.7, 51.9].map((y, row) => ({
    x: 76,
    y,
    width: 14.5,
    angle: 24,
    start: 12 + row * 4,
    count: 4,
  })),
];

export default function RoomBooks({
  posts,
  offset,
  onPull,
  onFocus,
  onInspect,
}: {
  posts: PostMeta[];
  offset: number;
  onPull: (event: MouseEvent<HTMLAnchorElement>, post: PostMeta) => void;
  onFocus: (event: FocusEvent<HTMLAnchorElement>) => void;
  onInspect: (post: PostMeta | null) => void;
}) {
  return (
    <nav className="room-books" aria-label="Books on the library shelves">
      {bays.map((bay, shelf) => (
        <div
          key={shelf}
          className={`in-room-shelf ${shelf < 6 ? 'west-shelf' : 'east-shelf'}`}
          style={
            {
              '--shelf-x': `${bay.x}%`,
              '--shelf-y': `${bay.y}%`,
              '--shelf-width': `${bay.width}%`,
              '--shelf-angle': `${bay.angle}deg`,
            } as CSSProperties
          }
        >
          {posts.slice(bay.start, bay.start + bay.count).map((post, slot) => {
            const appearance = bookAppearance(post);
            const number = String(offset + bay.start + slot + 1).padStart(2, '0');
            return (
              <Link
                key={post.filePath}
                id={`post-${bookSlug(post)}`}
                href={`/articles/${bookSlug(post)}`}
                prefetch={false}
                className="room-book"
                onClick={(event) => onPull(event, post)}
                onFocus={(event) => {
                  onFocus(event);
                  onInspect(post);
                }}
                onBlur={() => onInspect(null)}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') onInspect(post);
                }}
                onPointerLeave={() => onInspect(null)}
                aria-label={`Book ${number}: ${post.data.title} — ${post.data.readingTime}`}
                style={
                  {
                    '--binding': appearance.binding,
                    '--binding-position': appearance.texturePosition,
                    '--spine-height': `${appearance.height}%`,
                  } as CSSProperties
                }
              >
                <span className="spine-number" aria-hidden="true">
                  {number}
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
