import ArticleCard from './ArticleCard';
import type { PostMeta } from '../../utils/mdxUtils';

const ArticleList = ({ posts }: { posts: PostMeta[] }) => (
  // Keep the full archive height available when the browser restores history.
  // Revealing cards after mount clamps saved scroll positions to a shorter list.
  <div className="space-y-6">
    {posts.map((post) => (
      <ArticleCard key={post.filePath} post={post} />
    ))}
  </div>
);

export default ArticleList;
