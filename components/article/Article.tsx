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
    <div className="pt-4 md:pt-10 w-full min-w-full">
      {/* Return button always stays in flow, above the article content */}
      <div className="mb-6 md:mb-10 max-w-[65ch] md:max-w-[75ch] lg:max-w-[85ch] mx-auto flex items-center">
        <button
          onClick={handleBackClick}
          className="group flex items-center gap-2 text-secondary hover:text-primary transition-all duration-300"
          aria-label="Go back to previous page"
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full border border-accent-subtle/50 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300 overflow-hidden">
            <span className="absolute transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 text-[10px]">
              ←
            </span>
            <span className="w-2.5 h-[1px] bg-secondary group-hover:bg-primary transition-colors duration-300 group-hover:opacity-0" />
          </div>
          <span className="text-xs tracking-[0.2em] uppercase font-light mt-[1px]">Return</span>
        </button>
      </div>

      <article className="prose prose-slate dark:prose-invert dark:text-background-dark md:prose-lg lg:prose-xl prose-a:no-underline text-sm sm:text-base mx-auto relative">
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