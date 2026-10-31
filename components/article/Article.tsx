import type { ArticleData } from '../types';
import { formatDate } from '../../utils/dateUtils';
import type { BreadcrumbItem } from '../../utils/seo';
import BreadcrumbTrail from '../seo/BreadcrumbTrail';
import ArticleNavigation, { type ArticleNavItem } from './ArticleNavigation';

type ArticleProps = {
  frontMatter: ArticleData & { slug: string };
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
  previousPost?: ArticleNavItem | null;
  nextPost?: ArticleNavItem | null;
};

export default function Article({
  frontMatter,
  breadcrumbs,
  children,
  previousPost,
  nextPost,
}: ArticleProps) {
  return (
    <div className="reading-page">
      <article className="prose dark:prose-invert">
        <header className="reading-page-header not-prose">
          <BreadcrumbTrail items={breadcrumbs} />
          <p className="eyebrow">FROM THE PHILP LIBRARY</p>
          <h1>{frontMatter.title}</h1>
          {frontMatter.description && <p>{frontMatter.description}</p>}
          <div className="reading-metadata">
            <time dateTime={frontMatter.date}>{formatDate(frontMatter.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{frontMatter.category}</span>
            <span aria-hidden="true">·</span>
            <span>{frontMatter.readingTime}</span>
          </div>
        </header>
        <section>{children}</section>
        <ArticleNavigation
          currentPostSlug={frontMatter.slug}
          previousPost={previousPost}
          nextPost={nextPost}
        />
      </article>
    </div>
  );
}
