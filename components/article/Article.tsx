import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dateUtils';
import ArticleNavigation from './ArticleNavigation';

const Article = ({ frontMatter, children, previousPost, nextPost }) => {
  const router = useRouter();
  const [visibleSlug, setVisibleSlug] = useState<string>(frontMatter.slug);
  const [exitSlug, setExitSlug] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let frame: number | null = null;

    frame = window.requestAnimationFrame(() => {
      setVisibleSlug(frontMatter.slug);
    });

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [frontMatter.slug]);

  const isExiting = exitSlug === frontMatter.slug;
  const isContentVisible = visibleSlug === frontMatter.slug && !isExiting;

  const handleBackClick = () => {
    if (typeof window === 'undefined') return;
    setExitSlug(frontMatter.slug);

    const currentPath = router.asPath;
    let fallbackTimeout: number | null = null;

    const cleanup = () => {
      if (fallbackTimeout) {
        window.clearTimeout(fallbackTimeout);
      }
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };

    const handleRouteChangeComplete = () => {
      cleanup();
      setExitSlug(null);
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.back();

    fallbackTimeout = window.setTimeout(() => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      if (router.asPath === currentPath) {
        void router.push('/');
      }
    }, 300);
  };

  return (
    <div className="pt-5 md:pt-10 w-full min-w-full">
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="title" content={frontMatter.title} />
        <meta name="description" content={frontMatter.description} />
        <meta name="date" content={frontMatter.date} />
      </Head>
      <article
        aria-busy={!isContentVisible || isExiting}
        className={`prose prose-slate dark:prose-invert dark:text-background-dark md:prose-lg lg:prose-xl prose-a:no-underline text-sm sm:text-base mx-auto transition-opacity duration-300 ease-out ${
          isContentVisible && !isExiting ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="pb-5">
          <button
            onClick={handleBackClick}
            className="text-secondary hover:text-primary transition-colors duration-300 flex items-center group"
          >
            <span className="border-b border-accent-subtle transition-all duration-300 group-hover:border-primary mr-2 w-6"></span>
            <span className="text-sm">Back</span>
          </button>
        </div>
        <time className="order-first flex items-center text-secondary">
          <span className="text-sm font-light tracking-wider">
            {formatDate(frontMatter.date)}
          </span>
        </time>
        <section className="text-justify dark:text-background-dark">{children}</section>

        <ArticleNavigation previousPost={previousPost} nextPost={nextPost} />
      </article>
      {!isContentVisible && (
        <div className="py-8 text-center text-secondary text-xs tracking-[0.3em] uppercase">
          Loading article...
        </div>
      )}
    </div>
  );
};

export default Article;
