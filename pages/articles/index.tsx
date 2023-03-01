import { articleFilePaths, ARTICLES_PATH } from '../../utils/mdxUtils';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ArticleCard from '../../components/article/ArticleCard';

const Articles = ({ posts }) => {
  return (
    <div className='max-w-2xl mx-auto'>
      {posts.map(post => <ArticleCard key={post.data.title} post={post} />)}
    </div>
  );
};

export function getStaticProps() {
  const posts = articleFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(ARTICLES_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { posts } };
}

export default Articles;
