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
    </div>
  );
};

export default Article;