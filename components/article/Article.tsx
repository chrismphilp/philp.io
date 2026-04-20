import type { ArticleData } from '../types';
import { formatDate } from '../../utils/dateUtils';
import type { BreadcrumbItem } from '../../utils/seo';
import BreadcrumbTrail from '../seo/BreadcrumbTrail';
import ArticleNavigation from './ArticleNavigation';

type ArticleNavItem = {
  title: string;
  description: string;
  slug: string;
} | null;

type ArticleProps = {
  frontMatter: ArticleData & { slug: string };
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
  previousPost: ArticleNavItem;
  nextPost: ArticleNavItem;
};

const Article = ({
  frontMatter,
  breadcrumbs,
  children,
  previousPost,
  nextPost,
}: ArticleProps) => {
  return (
    <div className="article-shell w-full pt-4">
      <div className="article-shell-inner mx-auto flex w-full flex-col md:items-center md:pt-6 lg:items-start">
        {/* LHS Metadata Column */}
        <aside className="hidden lg:sticky lg:top-24 lg:mb-0 lg:block lg:w-40 lg:flex-shrink-0">
          <div className="border-r-[1.5px] border-accent-subtle/60 py-1 pr-6 text-right">
            <time className="block text-sm text-secondary font-light tracking-[0.2em] uppercase">
              {formatDate(frontMatter.date)}
            </time>
            {frontMatter.category && (
              <span className="mt-2 block text-[10px] font-medium tracking-widest text-secondary/60 uppercase">
                {frontMatter.category}
              </span>
            )}
            <span className="mt-4 block text-xs tracking-widest text-secondary/70 uppercase">
              {frontMatter.readingTime}
            </span>
          </div>
        </aside>

        {/* Main Content */}
        <article className="prose dark:prose-invert w-full min-w-0 max-w-full text-sm sm:max-w-[65ch] sm:text-base md:prose-lg md:max-w-[75ch] lg:prose-xl lg:max-w-none">
          <header className="mb-10 border-b border-accent-subtle pb-8 not-prose">
            <BreadcrumbTrail items={breadcrumbs} />
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary leading-tight">
              {frontMatter.title}
            </h1>
            {frontMatter.description && (
              <p className="mt-4 w-full max-w-full text-base text-secondary leading-relaxed md:max-w-3xl md:text-lg">
                {frontMatter.description}
              </p>
            )}
          </header>
          <section className="text-justify [&>*:first-child]:mt-0">{children}</section>

          <ArticleNavigation previousPost={previousPost} nextPost={nextPost} />
        </article>

        <div className="hidden lg:block lg:w-40 lg:flex-shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
};

export default Article;
