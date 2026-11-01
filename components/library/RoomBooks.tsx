'use client';

import Link from 'next/link';
import PixelIcon from './PixelIcon';
import type { CSSProperties, FocusEvent, MouseEvent } from 'react';
import type { PostMeta } from '../../utils/mdxUtils';
import { bookAppearance, bookSlug } from '../../utils/library';

// Twelve bays in the restored room, with two readable, tappable spines per bay.
const shelfBottoms = [13.1, 21.8, 30.5, 39.2, 47.9, 56.5];

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
      {Array.from({ length: 12 }, (_, shelf) => (
        <div
          key={shelf}
          className={`in-room-shelf ${shelf < 6 ? 'west-shelf' : 'east-shelf'}`}
          style={{ '--shelf-bottom': `${100 - shelfBottoms[shelf % 6]}%` } as CSSProperties}
        >
          {posts.slice(shelf * 2, (shelf + 1) * 2).map((post, slot) => {
            const appearance = bookAppearance(post);
            const number = String(offset + shelf * 2 + slot + 1).padStart(2, '0');
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
                    '--spine-height': `${appearance.height}%`,
                  } as CSSProperties
                }
              >
                <span className="spine-number" aria-hidden="true">
                  {number}
                </span>
                <span className="spine-stamp" aria-hidden="true">
                  <PixelIcon name="star" />
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
