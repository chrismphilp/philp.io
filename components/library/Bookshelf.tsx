'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import type { PostMeta } from '../../utils/mdxUtils';
import { formatDate } from '../../utils/dateUtils';
import PixelIcon from './PixelIcon';

const bindings = [
  '#6c3630',
  '#3e5850',
  '#795d31',
  '#414f60',
  '#65506a',
  '#80503a',
  '#536044',
  '#73503c',
];
const slug = (post: PostMeta) => post.filePath.replace(/\.mdx?$/, '');

export default function Bookshelf({
  posts,
  collection = 'all',
}: {
  posts: PostMeta[];
  collection?: 'all' | 'tech' | 'misc';
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [view, setView] = useState<'shelves' | 'list'>('shelves');
  const [selected, setSelected] = useState<PostMeta | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const filtered = posts.filter((post) => {
    const matchesCategory =
      category === 'all' ||
      (category === 'tech'
        ? post.data.category === 'Technology'
        : post.data.category !== 'Technology');
    const text =
      `${post.data.title} ${post.data.description} ${post.data.category}`.toLowerCase();
    return matchesCategory && text.includes(query.trim().toLowerCase());
  });

  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);

  function pullBook(event: MouseEvent<HTMLAnchorElement>, post: PostMeta) {
    // Preserve native new-tab behavior; without JS, these are ordinary article links.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;
    event.preventDefault();
    opener.current = event.currentTarget;
    setSelected(post);
  }

  return (
    <section id="bookshelf" className="bookshelf-section" aria-labelledby="shelf-heading">
      <div className="shelf-heading-row">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h2 id="shelf-heading">A shelf of curiosities.</h2>
        </div>
        <p className="shelf-instruction">
          Every book is an essay.
          <br />
          Pull one out. See where it takes you.
        </p>
      </div>
      <div className="catalogue-toolbar">
        <div className="shelf-filters" role="group" aria-label="Filter books">
          <button
            type="button"
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            {collection === 'all'
              ? 'All writing'
              : collection === 'tech'
                ? 'Technology'
                : 'Life & everything'}
          </button>
          {collection === 'all' && (
            <>
              <button
                type="button"
                aria-pressed={category === 'tech'}
                onClick={() => setCategory('tech')}
              >
                Technology
              </button>
              <button
                type="button"
                aria-pressed={category === 'misc'}
                onClick={() => setCategory('misc')}
              >
                Life & everything
              </button>
            </>
          )}
        </div>
        <div className="catalogue-tools">
          <label className="catalogue-search">
            <PixelIcon name="search" size={15} />
            <span className="sr-only">Search the collection</span>
            <input
              ref={search}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a book…"
            />
          </label>
          <div className="view-toggle" role="group" aria-label="Collection display">
            <button
              type="button"
              aria-label="Show bookshelves"
              aria-pressed={view === 'shelves'}
              onClick={() => setView('shelves')}
            >
              <PixelIcon name="shelf" />
            </button>
            <button
              type="button"
              aria-label="Show reading list"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
            >
              <PixelIcon name="list" />
            </button>
          </div>
        </div>
      </div>
      <div className="catalogue-meta">
        <span aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'VOLUME' : 'VOLUMES'}
          {query || category !== 'all' ? ' FOUND' : ' & COUNTING'}
        </span>
        <span>COLLECTED THOUGHTS</span>
      </div>
      <div className={`bookcase ${view === 'list' ? 'bookcase-list' : ''}`}>
        {filtered.map((post) => {
          const index = posts.indexOf(post);
          return (
            <div className="book-slot" key={post.filePath} id={`post-${slug(post)}`}>
              <Link
                href={`/articles/${slug(post)}`}
                prefetch={false}
                className="book-link"
                onClick={(event) => pullBook(event, post)}
                style={
                  {
                    '--binding': bindings[index % bindings.length],
                    '--book-height': `${218 + ((index * 17) % 38)}px`,
                    '--book-tilt': `${index % 7 === 3 ? -3 : index % 9 === 5 ? 2 : 0}deg`,
                  } as CSSProperties
                }
                title={`${post.data.title} · ${post.data.readingTime}`}
              >
                <span className="book-spine-top" aria-hidden="true">
                  {index === 0 ? 'NEW' : 'CP'}
                </span>
                <span className="book-title">{post.data.title}</span>
                <span className="book-spine-bottom" aria-hidden="true">
                  <PixelIcon
                    name={post.data.category === 'Technology' ? 'star' : 'book'}
                    size={14}
                  />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </span>
                <span className="book-list-detail">
                  <span>{post.data.description}</span>
                  <span>
                    {post.data.category} · {formatDate(post.data.date)} ·{' '}
                    {post.data.readingTime}
                  </span>
                </span>
                <span className="book-list-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="empty-shelf">
          <PixelIcon name="book" size={32} />
          <h3>That shelf is empty.</h3>
          <p>No books match “{query}”. Try another title or topic.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
              search.current?.focus();
            }}
          >
            Show all books <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
      <p className="shelf-footnote">
        <PixelIcon name="tea" size={18} /> Best enjoyed with a cup of something warm.
      </p>
      <dialog
        ref={dialog}
        className="book-dialog"
        aria-labelledby="book-preview-title"
        onClose={() => {
          setSelected(null);
          opener.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        {selected && (
          <div className="book-preview">
            <button
              type="button"
              className="dialog-close"
              aria-label="Return book to shelf"
              onClick={() => dialog.current?.close()}
            >
              <PixelIcon name="close" />
            </button>
            <div
              className="book-cover"
              style={
                {
                  '--binding': bindings[posts.indexOf(selected) % bindings.length],
                } as CSSProperties
              }
              aria-hidden="true"
            >
              <span>THE PHILP LIBRARY</span>
              <span className="cover-ornament">✦</span>
              <span className="cover-title">{selected.data.title}</span>
              <span className="cover-author">CHRISTOPHER PHILP</span>
            </div>
            <div className="book-preview-copy">
              <p className="eyebrow">
                {selected.data.category} · {selected.data.readingTime}
              </p>
              <h2 id="book-preview-title">{selected.data.title}</h2>
              <p>
                {selected.data.description ||
                  'A thought from the library. Settle in and turn the first page.'}
              </p>
              <p className="preview-date">{formatDate(selected.data.date)}</p>
              <Link
                className="open-book"
                href={`/articles/${slug(selected)}`}
                prefetch={false}
              >
                Open this book <PixelIcon name="arrow" />
              </Link>
              <button
                type="button"
                className="keep-browsing"
                onClick={() => dialog.current?.close()}
              >
                Or keep browsing
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
