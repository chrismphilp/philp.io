import type { ArticleData } from '../types';
import { formatDate } from '../../utils/dateUtils';
import ArticleNavigation from './ArticleNavigation';

type ArticleNavItem = {
  title: string;
  description: string;
  slug: string;
} | null;

type ArticleProps = {
  frontMatter: ArticleData & { slug: string };
  children: React.ReactNode;
  previousPost: ArticleNavItem;
  nextPost: ArticleNavItem;
};

const Article = ({ frontMatter, children, previousPost, nextPost }: ArticleProps) => {
  return (
    <div className="pt-4 md:pt-10 w-full min-w-full">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-20">
        {/* LHS Metadata Column */}
        <aside className="lg:w-40 lg:flex-shrink-0 lg:sticky lg:top-24 mb-8 lg:mb-0 lg:text-right border-l-[1.5px] lg:border-l-0 lg:border-r-[1.5px] border-accent-subtle/60 pl-5 lg:pl-0 lg:pr-6 py-1">
          <time className="block text-sm text-secondary font-light tracking-[0.2em] uppercase">
            {formatDate(frontMatter.date)}
          </time>
          {frontMatter.category && (
            <span className="block mt-2 text-[10px] text-secondary/60 tracking-widest uppercase font-medium">
              {frontMatter.category}
            </span>
          )}
          <span className="block mt-4 text-xs text-secondary/70 tracking-widest uppercase">
            {frontMatter.readingTime}
          </span>
        </aside>

        {/* Main Content */}
        <article className="prose dark:prose-invert md:prose-lg lg:prose-xl prose-a:no-underline text-sm sm:text-base flex-grow min-w-0 max-w-[65ch] md:max-w-[75ch] lg:max-w-[80ch]">
          <header className="mb-10 border-b border-accent-subtle pb-8 not-prose">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary leading-tight">
              {frontMatter.title}
            </h1>
            {frontMatter.description && (
              <p className="mt-4 max-w-3xl text-base md:text-lg text-secondary leading-relaxed">
                {frontMatter.description}
              </p>
            )}
          </header>
          <section className="text-justify [&>*:first-child]:mt-0">{children}</section>

          <ArticleNavigation previousPost={previousPost} nextPost={nextPost} />
        </article>
      </div>
    </div>
  );
};

export default Article;
