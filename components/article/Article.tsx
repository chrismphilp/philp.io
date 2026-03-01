import { formatDate } from '../../utils/dateUtils';
import ArticleNavigation from './ArticleNavigation';

const Article = ({ frontMatter, children, previousPost, nextPost }) => {
  return (
    <div className="pt-4 md:pt-10 w-full min-w-full">
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