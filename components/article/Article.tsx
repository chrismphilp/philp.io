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

const Article = ({
  frontMatter,
  breadcrumbs,
  children,
  previousPost,
  nextPost,
}: ArticleProps) => {
  return (
    <article className="reading-article">
      <header className="reading-header">
        <BreadcrumbTrail items={breadcrumbs} />
        <div className="reading-meta">
          <span>{frontMatter.category}</span>
          <time dateTime={new Date(frontMatter.date).toISOString()}>
            {formatDate(frontMatter.date)}
          </time>
          <span>{frontMatter.readingTime}</span>
        </div>
        <h1>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className="reading-description">{frontMatter.description}</p>
        )}
      </header>
      <div className="prose reading-body">{children}</div>
      <ArticleNavigation
        currentPostSlug={frontMatter.slug}
        previousPost={previousPost}
        nextPost={nextPost}
      />
    </article>
  );
};
export default Article;
