'use client';

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
} from 'react';
import type { PostMeta } from '../../utils/mdxUtils';
import { formatDate } from '../../utils/dateUtils';
import PixelIcon from './PixelIcon';
import RoomBooks, { bindings, bookSlug, ROOM_CAPACITY } from './RoomBooks';
import RoomCatalogue from './RoomCatalogue';
import { FireplaceControls } from './FireplaceSound';

type Place = 'window' | 'west' | 'hearth' | 'east' | 'tea';
const places: { key: Place; name: string; x: number; y: number }[] = [
  { key: 'window', name: 'Snowfall', x: 0.1, y: 0.4 },
  { key: 'west', name: 'West shelves', x: 0.313, y: 0.31 },
  { key: 'hearth', name: 'Fireside', x: 0.45, y: 0.75 },
  { key: 'east', name: 'East shelves', x: 0.761, y: 0.31 },
  { key: 'tea', name: 'Tea corner', x: 0.9, y: 0.6 },
];

export default function ReadingRoom({
  posts,
  reading = false,
}: {
  posts: PostMeta[];
  reading?: boolean;
}) {
  const room = useRef<HTMLElement>(null);
  const panorama = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDialogElement>(null);
  const catalogue = useRef<HTMLDialogElement>(null);
  const about = useRef<HTMLDialogElement>(null);
  const dogTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingBook = useRef<string | null>(null);
  const restoredHash = useRef('');
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const [awake, setAwake] = useState(false);
  const [message, setMessage] = useState('');
  const [place, setPlace] = useState<Place>('hearth');
  const [selected, setSelected] = useState<PostMeta | null>(null);
  const [bookPage, setBookPage] = useState(0);
  const pageCount = Math.ceil(posts.length / ROOM_CAPACITY);
  const visiblePosts = posts.slice(bookPage * ROOM_CAPACITY, (bookPage + 1) * ROOM_CAPACITY);

  const moveTo = useCallback((key: Place, smooth = true) => {
    const view = panorama.current;
    const scene = world.current;
    if (!view || !scene) return;
    const destination = places.find((item) => item.key === key)!;
    // Fingers need the same generous shelf close-up even on short landscape screens.
    const shelfWidth = matchMedia('(pointer: coarse)').matches
      ? 2160
      : Math.max(1500, Math.min(2160, view.clientHeight * 3.3));
    scene.style.setProperty(
      '--camera-width',
      key === 'west' || key === 'east' ? `${shelfWidth}px` : '0px',
    );
    view.scrollTo({
      left: scene.clientWidth * destination.x - view.clientWidth / 2,
      top: scene.clientHeight * destination.y - view.clientHeight / 2,
      behavior:
        smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'smooth'
          : 'instant',
    });
    setPlace(key);
  }, []);

  function say(text: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setMessage(text);
    toastTimer.current = setTimeout(() => setMessage(''), 5200);
  }

  const locateBook = useCallback(
    (slug: string) => {
      const index = posts.findIndex((post) => bookSlug(post) === slug);
      if (index < 0) return;
      const page = Math.floor(index / ROOM_CAPACITY);
      if (page !== bookPage) {
        pendingBook.current = slug;
        setBookPage(page);
        return;
      }
      const book = document.getElementById(`post-${slug}`);
      if (book) {
        moveTo(book.closest('.west-shelf') ? 'west' : 'east', false);
        book.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
        book.focus({ preventScroll: true });
        setPlace(book.closest('.west-shelf') ? 'west' : 'east');
      }
    },
    [bookPage, posts, moveTo],
  );

  useEffect(() => {
    if (pendingBook.current) {
      const slug = pendingBook.current;
      pendingBook.current = null;
      locateBook(slug);
    }
  }, [bookPage, locateBook]);

  useEffect(() => {
    moveTo('hearth', false);
    const view = panorama.current;
    if (!view) return;
    // Keep the room's subject in view when rotating a phone or resizing a window.
    let width = view.clientWidth;
    const observer = new ResizeObserver(() => {
      if (Math.abs(width - view.clientWidth) > 50) {
        width = view.clientWidth;
        moveTo('hearth', false);
      }
    });
    observer.observe(view);
    return () => observer.disconnect();
  }, [moveTo]);

  useEffect(() => {
    if (reading) {
      restoredHash.current = '';
      return;
    }
    const restore = () => {
      if (!location.hash.startsWith('#post-') || restoredHash.current === location.hash)
        return;
      try {
        const slug = decodeURIComponent(location.hash.slice(6));
        restoredHash.current = location.hash;
        locateBook(slug);
      } catch {
        /* Ignore malformed URL fragments; the room is still navigable. */
      }
    };
    restore();
    window.addEventListener('hashchange', restore);
    return () => window.removeEventListener('hashchange', restore);
  }, [reading, locateBook]);

  useEffect(() => {
    if (selected) preview.current?.showModal();
  }, [selected]);

  useEffect(() => {
    const sync = () => {
      room.current?.classList.toggle('room-resting', document.hidden);
    };
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  useEffect(() => {
    return () => {
      if (dogTimer.current) clearTimeout(dogTimer.current);
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function greetDog() {
    if (dogTimer.current) clearTimeout(dogTimer.current);
    setAwake(true);
    say('A sleepy hello. The librarian approves of you.');
    dogTimer.current = setTimeout(() => setAwake(false), 4200);
  }

  function pullBook(event: MouseEvent<HTMLAnchorElement>, post: PostMeta) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;
    event.preventDefault();
    setSelected(post);
  }

  function focusBook(event: FocusEvent<HTMLAnchorElement>) {
    // Native scrollIntoView makes off-screen books accessible with Tab, including without drag gestures.
    if (!event.currentTarget.matches(':focus-visible')) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const view = panorama.current?.getBoundingClientRect();
    if (
      view &&
      (bounds.left < view.left + 8 ||
        bounds.right > view.right - 8 ||
        bounds.top < view.top + 8 ||
        bounds.bottom > view.bottom - 8)
    ) {
      event.currentTarget.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'instant',
      });
    }
  }

  function closePreview() {
    preview.current?.close();
  }

  return (
    <section
      ref={room}
      className={`immersive-room${paused ? ' room-paused' : ''}${reading ? ' room-reading' : ''}`}
      aria-label="The reading room"
      inert={reading}
      aria-hidden={reading || undefined}
    >
      <header className="room-hud">
        <h1 className="room-heading">
          <button
            type="button"
            className="room-wordmark"
            onClick={() => about.current?.showModal()}
            title="About this library"
          >
            <span className="status-light" aria-hidden="true" />
            <span>
              <span className="room-title">The reading room</span>{' '}
              <small>CHRISTOPHER PHILP’S LIBRARY</small>
            </span>
          </button>
        </h1>
        <span className="winter-weather">
          <span aria-hidden="true">❄</span> SNOW OUTSIDE. WARM INSIDE.
        </span>
        <div className="room-hud-actions">
          <FireplaceControls />
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            aria-label={paused ? 'Resume scene animation' : 'Pause scene animation'}
          >
            <PixelIcon name={paused ? 'play' : 'pause'} />
          </button>
        </div>
      </header>
      <div
        ref={panorama}
        className="room-panorama"
        aria-label="Explore the library. Swipe or drag to look around."
        onPointerDownCapture={(event) => {
          const view = event.currentTarget;
          // A tap during camera travel should hit the book under the pointer.
          view.scrollTo({ left: view.scrollLeft, top: view.scrollTop, behavior: 'instant' });
        }}
        onPointerDown={(event) => {
          if (
            event.pointerType !== 'mouse' ||
            event.button !== 0 ||
            (event.target as HTMLElement).closest('a, button')
          )
            return;
          const view = event.currentTarget;
          drag.current = {
            x: event.clientX,
            y: event.clientY,
            left: view.scrollLeft,
            top: view.scrollTop,
          };
          view.setPointerCapture(event.pointerId);
          view.classList.add('is-dragging');
        }}
        onPointerMove={(event) => {
          if (drag.current) {
            event.currentTarget.scrollLeft =
              drag.current.left - (event.clientX - drag.current.x);
            event.currentTarget.scrollTop =
              drag.current.top - (event.clientY - drag.current.y);
          }
        }}
        onPointerUp={(event) => {
          drag.current = null;
          event.currentTarget.classList.remove('is-dragging');
        }}
        onPointerCancel={(event) => {
          drag.current = null;
          event.currentTarget.classList.remove('is-dragging');
        }}
      >
        <div ref={world} className="room-world">
          <picture>
            <source
              media="(max-width: 600px)"
              type="image/avif"
              srcSet="/library/reading-room-mobile.avif"
            />
            <source
              media="(min-width: 601px)"
              type="image/avif"
              srcSet="/library/reading-room.avif"
            />
            <source media="(max-width: 600px)" srcSet="/library/reading-room-mobile.webp" />
            {/* One compressed background, no canvas, video, or animation runtime. */}
            <img
              className="room-background"
              src="/library/reading-room.webp"
              width="1672"
              height="941"
              alt="A snowy evening in a pixel-art British mansion library, with walnut shelves, a stone fireplace, and a man resting in an armchair with his feet on a pouffe and tea beside him."
              fetchPriority="high"
              decoding="async"
              draggable={false}
            />
          </picture>
          <div className="hearth-glow" aria-hidden="true" />
          <div className="fire" aria-hidden="true" />
          <div className="tea-steam" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="window-snow" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => (
              <i
                key={i}
                style={
                  {
                    '--flake-x': `${(i * 17) % 100}%`,
                    '--flake-delay': `${-i * 1.7}s`,
                    '--flake-speed': `${9 + (i % 6)}s`,
                    '--flake-size': `${i % 3 === 0 ? 3 : 2}px`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <RoomBooks
            posts={visiblePosts}
            allPosts={posts}
            onPull={pullBook}
            onFocus={focusBook}
          />
          <button
            className={`library-dog${awake ? ' dog-awake' : ''}`}
            type="button"
            onClick={greetDog}
            aria-label="Say a quiet hello to the sleeping Bernese Mountain Dog"
          >
            <span className="dog-sprite" />
            <span className="dog-sleep" aria-hidden="true">
              z z Z
            </span>
            <span className="dog-hint">Say a quiet hello</span>
          </button>
          <button
            className="room-secret tea-hotspot"
            type="button"
            aria-label="Enjoy a cup of tea"
            onClick={() => say('Earl Grey. Still warm. There’s no need to hurry.')}
          >
            <span>Time for tea</span>
          </button>
          <button
            className="room-secret painting-hotspot"
            type="button"
            aria-label="Look at the painting"
            onClick={() =>
              say('Somewhere in the Highlands. A good place to let your thoughts wander.')
            }
          >
            <span>A view of the Highlands</span>
          </button>
          <button
            className="room-secret fire-hotspot"
            type="button"
            aria-label="Warm your hands by the fire"
            onClick={() => say('The logs settle into the grate. Just one more chapter.')}
          >
            <span>Warm your hands</span>
          </button>
        </div>
      </div>
      <div className={`room-toast${message ? ' has-message' : ''}`} role="status">
        {message}
      </div>
      <footer className="room-dock">
        <div className="room-guide">
          <span className="guide-star" aria-hidden="true">
            ✦
          </span>
          <p>
            Every book is a story.<span> Pull one from the shelf.</span>
            <small>SWIPE OR DRAG TO EXPLORE</small>
          </p>
        </div>
        <nav className="room-places" aria-label="Explore the room">
          {places.map((item) => (
            <button
              type="button"
              key={item.key}
              onClick={() => moveTo(item.key)}
              aria-pressed={place === item.key}
              aria-label={`Look at ${item.name.toLowerCase()}`}
            >
              <span aria-hidden="true">
                {item.key === 'window'
                  ? '❄'
                  : item.key === 'west' || item.key === 'east'
                    ? '▥'
                    : item.key === 'hearth'
                      ? '♨'
                      : '♧'}
              </span>
              <small>{item.name}</small>
            </button>
          ))}
        </nav>
        <button
          className="catalogue-button"
          type="button"
          onClick={() => catalogue.current?.showModal()}
        >
          <PixelIcon name="search" />
          <span>
            Find a book<small>{posts.length} VOLUMES</small>
          </span>
        </button>
        {pageCount > 1 && (
          <button
            className="more-volumes"
            type="button"
            onClick={() => setBookPage((bookPage + 1) % pageCount)}
          >
            Shelves {bookPage + 1}/{pageCount} →
          </button>
        )}
      </footer>
      <RoomCatalogue
        posts={posts}
        dialog={catalogue}
        onLocate={(post) => {
          catalogue.current?.close();
          locateBook(bookSlug(post));
        }}
        onLeave={() => catalogue.current?.close()}
      />
      <dialog
        ref={preview}
        className="book-dialog room-book-dialog"
        aria-labelledby="book-preview-title"
        onClose={() => {
          if (selected)
            document
              .getElementById(`post-${bookSlug(selected)}`)
              ?.focus({ preventScroll: true });
          setSelected(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePreview();
        }}
      >
        {selected && (
          <div className="book-preview">
            <button
              type="button"
              className="dialog-close"
              aria-label="Return book to shelf"
              onClick={closePreview}
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
              <p>{selected.data.description}</p>
              <p className="preview-date">{formatDate(selected.data.date)}</p>
              <Link
                className="open-book"
                href={`/articles/${bookSlug(selected)}`}
                prefetch={false}
                onClick={closePreview}
              >
                Open this book <PixelIcon name="arrow" />
              </Link>
              <button type="button" className="keep-browsing" onClick={closePreview}>
                Return to the shelf
              </button>
            </div>
          </div>
        )}
      </dialog>
      <dialog
        ref={about}
        className="room-dialog about-dialog"
        aria-labelledby="about-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) about.current?.close();
        }}
      >
        <div className="catalogue-paper">
          <button
            className="dialog-close"
            type="button"
            aria-label="Close about the library"
            onClick={() => about.current?.close()}
          >
            <PixelIcon name="close" />
          </button>
          <p className="eyebrow">A SMALL PLACE ON THE INTERNET</p>
          <h2 id="about-title">Come in. Stay a while.</h2>
          <p>
            I’m Christopher. These are my thoughts on software, life, and everything between.
            Every book on the shelves is something I’ve written.
          </p>
          <p>
            Pick a spine to take a closer look. Drag the room, or use the places below to
            wander. The dog is happy to keep you company.
          </p>
          <div className="about-links">
            <Link href="/tech" prefetch={false} onClick={() => about.current?.close()}>
              Technology ↗
            </Link>
            <Link href="/misc" prefetch={false} onClick={() => about.current?.close()}>
              Life & everything ↗
            </Link>
            <a href="https://github.com/chrismphilp/philp.io">Source ↗</a>
          </div>
          <p className="sound-credit">
            Fireplace recording by{' '}
            <a href="https://freesound.org/people/silencyo/sounds/81801/">silencyo</a>,
            released under <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>
            . Make yourself at home.
          </p>
        </div>
      </dialog>
    </section>
  );
}
