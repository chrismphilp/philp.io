import Link from 'next/link';
import { formatDate } from '../../utils/dateUtils';
import { postSlugFromPath, type PostMeta } from '../../utils/mdxUtils';

const ArticleCard = ({ post, index }: { post: PostMeta; index: number }) => {
  const slug = postSlugFromPath(post.filePath);
  return (
    <article id={`post-${slug}`} className="article-card">
      <Link className="article-link" href={`/articles/${slug}`} prefetch={false}>
        <span className="article-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="card-copy">
          <span className="card-category">{post.data.category}</span>
          <h2>{post.data.title}</h2>
          {post.data.description && <p>{post.data.description}</p>}
        </div>
        <div className="card-meta">
          <time dateTime={new Date(post.data.date).toISOString()}>
            {formatDate(post.data.date)}
          </time>
          <span>{post.data.readingTime}</span>
        </div>
        <span className="card-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
    </article>
  );
};
export default ArticleCard;
