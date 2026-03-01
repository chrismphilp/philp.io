"use client";
import { useRouter } from 'next/navigation';
import { formatDate } from '../../utils/dateUtils';
import ArticleNavigation from './ArticleNavigation';

const Article = ({ frontMatter, children, previousPost, nextPost }) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (typeof window === 'undefined') return;
    
    // Fallback: If navigating back doesn't change the path, push to home.
    const currentPath = window.location.pathname;
    setTimeout(() => {
      if (window.location.pathname === currentPath) {
        router.push('/');
      }
    }, 100);

    router.back();
  };

  return (
    <div className="pt-5 md:pt-10 w-full min-w-full">
      <article className="prose prose-slate dark:prose-invert dark:text-background-dark md:prose-lg lg:prose-xl prose-a:no-underline text-sm sm:text-base mx-auto">
        <div className="pb-8 mb-6 border-b border-accent-subtle/30">
          <button
            onClick={handleBackClick}
            className="group flex items-center gap-3 text-secondary hover:text-primary transition-all duration-300"
            aria-label="Go back to previous page"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-accent-subtle/50 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300 overflow-hidden">
              <span className="absolute transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 text-xs">
                ←
              </span>
              <span className="w-3 h-[1px] bg-secondary group-hover:bg-primary transition-colors duration-300 group-hover:opacity-0" />
            </div>
            <span className="text-sm tracking-widest uppercase font-light">Return</span>
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
    </div>
  );
};

export default Article;