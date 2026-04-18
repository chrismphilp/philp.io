import type { ReactNode } from 'react';
import type { ArticleData } from '../types';
import { formatDate } from '../../utils/dateUtils';
import type { ArticleHeading } from '../../utils/mdxUtils';
import ArticleNavigation, { type ArticleNavItem } from './ArticleNavigation';
import ReadingProgress from './ReadingProgress';

type ArticleProps = {
  frontMatter: ArticleData & { slug: string };
  children: ReactNode;
  previousPost?: ArticleNavItem | null;
  nextPost?: ArticleNavItem | null;
  headings?: ArticleHeading[];
};

const Article = ({
  frontMatter,
  children,
  previousPost,
  nextPost,
  headings = [],
}: ArticleProps) => {
  return (
    <div className="pt-4 md:pt-8 w-full min-w-full">
      <ReadingProgress />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-20">
        <aside className="lg:w-56 lg:flex-shrink-0 mb-10 lg:mb-0">
          <div className="lg:sticky lg:top-28 space-y-8">
            <div className="rounded-[1.5rem] border border-accent-subtle/70 bg-[rgba(240,239,231,0.72)] px-5 py-5 shadow-washi dark:bg-[rgba(53,49,43,0.92)]">
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-secondary">
                Published
              </p>
              <time className="mt-2 block text-base text-primary font-light">
                {formatDate(frontMatter.date)}
              </time>

              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-accent-subtle/70 pt-4 font-sans">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-secondary">
                    Category
                  </p>
                  <p className="mt-1 text-sm text-primary">{frontMatter.category}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-secondary">
                    Reading
                  </p>
                  <p className="mt-1 text-sm text-primary">{frontMatter.readingTime}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-secondary">
                    Length
                  </p>
                  <p className="mt-1 text-sm text-primary">
                    {frontMatter.wordCount.toLocaleString()} words
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-secondary">
                    Format
                  </p>
                  <p className="mt-1 text-sm text-primary">Essay</p>
                </div>
              </div>
            </div>

            {headings.length > 0 && (
              <nav
                className="hidden lg:block rounded-[1.5rem] border border-accent-subtle/70 px-5 py-5 shadow-washi"
                aria-label="Table of contents"
              >
                <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-secondary">
                  On this page
                </p>
                <ol className="mt-4 space-y-3">
                  {headings.map((heading) => (
                    <li key={heading.id} className={heading.level === 3 ? 'pl-4' : ''}>
                      <a
                        href={`#${heading.id}`}
                        className="block font-sans text-sm leading-6 text-secondary hover:text-accent-highlight transition-colors duration-300"
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        </aside>

        <article
          className="prose dark:prose-invert md:prose-lg lg:prose-xl prose-a:no-underline text-sm sm:text-base flex-grow min-w-0 max-w-[68ch] xl:max-w-[72ch]"
          data-reading-root
        >
          <header className="not-prose border-b border-accent-subtle/70 pb-8 md:pb-10 mb-10 md:mb-12">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-secondary">
              {frontMatter.category}
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-[-0.03em] text-primary font-light max-w-4xl">
              {frontMatter.title}
            </h1>
            {frontMatter.description && (
              <p className="mt-6 max-w-3xl text-lg md:text-xl leading-8 text-secondary font-light">
                {frontMatter.description}
              </p>
            )}
          </header>

          <section className="[&>*:first-child]:mt-0">{children}</section>

          <ArticleNavigation previousPost={previousPost} nextPost={nextPost} />
        </article>
      </div>
    </div>
  );
};

export default Article;
