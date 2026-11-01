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
import RoomBooks from './RoomBooks';
import { bookAppearance, bookSlug, findBookPage, getLibraryPage } from '../../utils/library';
import RoomCatalogue from './RoomCatalogue';
import { FireplaceControls } from './FireplaceSound';

const destinations = {
  west: { x: 0.39, y: 0.27 },
  hearth: { x: 0.52, y: 0.6 },
  east: { x: 0.83, y: 0.44 },
};

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
  const [selected, setSelected] = useState<PostMeta | null>(null);
  const [bookPage, setBookPage] = useState(0);
  const [inspected, setInspected] = useState<PostMeta | null>(null);
  const shelf = getLibraryPage(posts, bookPage);

  const moveTo = useCallback((key: keyof typeof destinations) => {
    const view = panorama.current;
    const scene = world.current;
    if (!view || !scene) return;
    const destination = destinations[key];
    view.scrollTo({
      left: scene.clientWidth * destination.x - view.clientWidth / 2,
      top: scene.clientHeight * destination.y - view.clientHeight / 2,
      behavior: 'instant',
    });
  }, []);

  function say(text: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setMessage(text);
    toastTimer.current = setTimeout(() => setMessage(''), 5200);
  }

  const locateBook = useCallback(
    (slug: string) => {
      const page = findBookPage(posts, slug);
      if (page === null) return;
      if (page !== bookPage) {
        pendingBook.current = slug;
        setBookPage(page);
        return;
      }
      const book = document.getElementById(`post-${slug}`);
      if (book) {
        moveTo(book.closest('.west-shelf') ? 'west' : 'east');
        book.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
        book.focus({ preventScroll: true });
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
    moveTo('hearth');
    const view = panorama.current;
    if (!view) return;
    // Keep the room's subject in view when rotating a phone or resizing a window.
    let width = view.clientWidth;
    const observer = new ResizeObserver(() => {
      if (Math.abs(width - view.clientWidth) > 50) {
        width = view.clientWidth;
        moveTo('hearth');
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
    setInspected(null);
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
            <span className="room-title">The reading room</span>
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
            <source type="image/avif" srcSet="/library/reading-room.avif" />
            <source media="(max-width: 600px)" srcSet="/library/reading-room-mobile.webp" />
            {/* Precompressed artwork has an AVIF source and WebP fallback. */}
            <img
              className="room-background"
              src="/library/reading-room.webp"
              width="480"
              height="360"
              alt="An isometric pixel diorama of a British mansion library on a snowy evening: walnut shelves, a golden hearth and a patterned rug on a floating wooden floor. A reader rests in a red armchair, only his arms and legs visible, feet on a pouffe, with tea beside him."
              fetchPriority="high"
              decoding="async"
              draggable={false}
            />
          </picture>
          <div className="hearth-glow" aria-hidden="true" />
          <div className="fire" aria-hidden="true" />
          <div className="fire-embers" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <i
                key={i}
                style={
                  {
                    '--ember-x': `${12 + ((i * 29) % 74)}%`,
                    '--ember-drift': `${(((i * 13) % 29) - 14) / 7}cqw`,
                    '--ember-duration': `${9.7 + ((i * 17) % 47) / 10}s`,
                    '--ember-delay': `${-i * 2.73}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
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
                    '--flake-size': `${i % 3 === 0 ? 0.52 : 0.26}cqw`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <RoomBooks
            posts={shelf.items}
            offset={shelf.first - 1}
            onInspect={setInspected}
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
              <PixelIcon name="sleep" />
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
            onClick={() => say('The logs settle softly. Just one more chapter.')}
          >
            <span>Warm your hands</span>
          </button>
        </div>
      </div>
      {inspected && !selected && (
        <div className="book-nameplate" aria-hidden="true">
          <span>
            {inspected.data.category} · {inspected.data.readingTime}
          </span>
          <strong>{inspected.data.title}</strong>
          <small>Pull this book from the shelf ↗</small>
        </div>
      )}
      <noscript>
        <nav className="room-noscript" aria-label="Browse all writing">
          <Link href="/tech">Technology</Link>
          <Link href="/misc">Life &amp; everything</Link>
        </nav>
      </noscript>
      <div className={`room-toast${message ? ' has-message' : ''}`} role="status">
        {message}
      </div>
      <footer className="room-dock">
        <nav className="room-pagination" aria-label="Bookcases">
          <button
            type="button"
            aria-label="Previous bookcase"
            disabled={shelf.page === 0}
            onClick={() => {
              setInspected(null);
              setBookPage(shelf.page - 1);
            }}
          >
            <PixelIcon name="arrow" style={{ transform: 'rotate(180deg)' }} />
          </button>
          <span
            aria-live="polite"
            aria-atomic="true"
            aria-label={`Bookcase ${shelf.page + 1} of ${shelf.pageCount}, volumes ${shelf.first} to ${shelf.last} of ${posts.length}`}
          >
            <small>BOOKCASE</small>
            <strong>
              {shelf.page + 1} / {shelf.pageCount}
            </strong>
          </span>
          <button
            type="button"
            aria-label="Next bookcase"
            disabled={shelf.page === shelf.pageCount - 1}
            onClick={() => {
              setInspected(null);
              setBookPage(shelf.page + 1);
            }}
          >
            <PixelIcon name="arrow" />
          </button>
        </nav>
        <span className="room-explore-hint">DRAG TO EXPLORE · PULL A BOOK TO READ</span>
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
                  '--binding': bookAppearance(selected).binding,
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
            Pick a numbered spine to see its title. Use the bookcase arrows for more volumes,
            or Find a book to search the whole collection. Swipe or drag the room to wander.
            The dog is happy to keep you company.
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
