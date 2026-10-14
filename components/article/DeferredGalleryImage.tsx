'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

type Props = { width: number; height: number; alt: string; children: ReactNode };

export default function DeferredGalleryImage({ width, height, alt, children }: Props) {
  const frame = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const showForPrint = () => flushSync(() => setVisible(true));
    window.addEventListener('beforeprint', showForPrint);
    let observer: IntersectionObserver | undefined;
    let fallback: number | undefined;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setVisible(true);
            observer?.disconnect();
          }
        },
        { rootMargin: '600px 0px' },
      );
      if (frame.current) observer.observe(frame.current);
    } else {
      fallback = requestAnimationFrame(() => setVisible(true));
    }
    return () => {
      observer?.disconnect();
      if (fallback !== undefined) cancelAnimationFrame(fallback);
      window.removeEventListener('beforeprint', showForPrint);
    };
  }, [visible]);

  return (
    <span
      ref={frame}
      data-gallery-frame
      className="[&_img]:my-0"
      role={!visible && alt ? 'img' : undefined}
      aria-label={!visible && alt ? alt : undefined}
      style={{
        display: 'block',
        width: '100%',
        maxWidth: width,
        aspectRatio: `${width} / ${height}`,
        margin: '2em auto',
      }}
    >
      {visible ? (
        children
      ) : (
        <span aria-hidden="true" style={{ display: 'contents' }}>
          <noscript>{children}</noscript>
        </span>
      )}
    </span>
  );
}
