'use client';

import Link from 'next/link';
import { useState, type RefObject } from 'react';
import type { PostMeta } from '../../utils/mdxUtils';
import { bookSlug, bookAppearance } from '../../utils/library';
import PixelIcon from './PixelIcon';

export default function RoomCatalogue({
  posts,
  dialog,
  onLocate,
  onLeave,
}: {
  posts: PostMeta[];
  dialog: RefObject<HTMLDialogElement | null>;
  onLocate: (post: PostMeta) => void;
  onLeave: () => void;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const filtered = posts.filter(
    (post) =>
      (category === 'all' ||
        (category === 'tech'
          ? post.data.category === 'Technology'
          : post.data.category !== 'Technology')) &&
      `${post.data.title} ${post.data.description} ${post.data.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <dialog
      ref={dialog}
      className="room-dialog catalogue-dialog"
      aria-labelledby="catalogue-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
    >
      <div className="catalogue-paper">
        <button
          className="dialog-close"
          type="button"
          aria-label="Close catalogue"
          onClick={() => dialog.current?.close()}
        >
          <PixelIcon name="close" />
        </button>
        <p className="eyebrow">THE PHILP LIBRARY</p>
        <h2 id="catalogue-title">The card catalogue.</h2>
        <p className="catalogue-intro">A little help finding your next read.</p>
        <label className="room-search">
          <PixelIcon name="search" />
          <span className="sr-only">Search the collection</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="A title, a topic, a passing thought…"
          />
        </label>
        <div className="room-filters" role="group" aria-label="Filter books">
          {(['all', 'tech', 'misc'] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={category === key}
              onClick={() => setCategory(key)}
            >
              {key === 'all'
                ? 'All writing'
                : key === 'tech'
                  ? 'Technology'
                  : 'Life & everything'}
            </button>
          ))}
        </div>
        <p className="catalogue-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'volume' : 'volumes'} · newest first
        </p>
        <ol className="catalogue-entries">
          {filtered.map((post) => (
            <li key={post.filePath}>
              <span
                className="catalogue-binding"
                style={{ background: bookAppearance(post).binding }}
                aria-hidden="true"
              />
              <Link href={`/articles/${bookSlug(post)}`} prefetch={false} onClick={onLeave}>
                <span>{post.data.title}</span>
                <small>
                  {post.data.category} · {post.data.readingTime}
                </small>
              </Link>
              <button
                type="button"
                onClick={() => onLocate(post)}
                aria-label={`Find ${post.data.title} on the shelf`}
                title="Find on the shelf"
              >
                <PixelIcon name="shelf" />
              </button>
            </li>
          ))}
        </ol>
        {!filtered.length && (
          <div className="catalogue-empty">
            <PixelIcon name="book" size={30} />
            <h3>No books found.</h3>
            <p>Try another title or topic.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
            >
              Show all books
            </button>
          </div>
        )}
        <p className="catalogue-end">
          Select a title to read, or <PixelIcon name="shelf" size={14} /> to find its place in
          the room.
        </p>
      </div>
    </dialog>
  );
}
