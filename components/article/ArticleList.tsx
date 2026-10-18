import ArticleCard from './ArticleCard';
import type { PostMeta } from '../../utils/mdxUtils';

const ArticleList = ({ posts }: { posts: PostMeta[] }) => (
  // Render the complete archive so history restores the original scroll position.
  <div className="article-list">
    {posts.map((post, index) => (
      <ArticleCard key={post.filePath} post={post} index={index} />
    ))}
  </div>
);
export default ArticleList;
