'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useRef, type ReactNode } from 'react';
import type { PostMeta } from '../../utils/mdxUtils';
import ReadingRoom from './ReadingRoom';
import PixelIcon from './PixelIcon';
import { FireplaceProvider, FireplaceControls } from './FireplaceSound';
import ThemeToggle from '../header/ThemeToggle';

/** The room survives route changes: opening a book doesn't leave the library. */
export default function LibraryShell({
  posts,
  children,
}: {
  posts: PostMeta[];
  children: ReactNode;
}) {
  const pathname = usePathname() ?? '/';
  const reading = pathname !== '/';
  const page = useRef<HTMLDivElement>(null);
  const previousPath = useRef(pathname);
  const slug = pathname.startsWith('/articles/') ? pathname.split('/')[2] : '';

  useEffect(() => {
    if (previousPath.current !== pathname && reading) {
      page.current?.scrollTo(0, 0);
      const heading = page.current?.querySelector<HTMLElement>('h1');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    }
    previousPath.current = pathname;
  }, [pathname, reading]);

  return (
    <FireplaceProvider>
      <main id="main-content" className="library-app" tabIndex={-1}>
        <ReadingRoom posts={posts} reading={reading} />
        {reading ? (
          <div ref={page} className="reader-surface">
            <div className="reader-toolbar">
              <Link
                href={slug ? `/#post-${slug}` : '/'}
                prefetch={false}
                className="return-to-room"
              >
                <span aria-hidden="true">←</span> Back to the room
              </Link>
              <span className="reader-toolbar-label">
                <PixelIcon name="book" /> THE READING ROOM
              </span>
              <div className="reader-settings">
                <FireplaceControls />
                <ThemeToggle />
              </div>
            </div>
            <div className="reader-pages">{children}</div>
          </div>
        ) : (
          children
        )}
      </main>
    </FireplaceProvider>
  );
}
