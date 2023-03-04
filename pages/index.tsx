import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { articleFilePaths, ARTICLES_PATH } from '../utils/mdxUtils';
import ArticleCard from 'components/article/ArticleCard';
import readingTime from 'reading-time';
import { ArticleData } from './articles';

const Homepage = ({ posts }) => {
  return (
    <div className='max-w-2xl mx-auto pt-5'>

      <div>
        <h5>Welcome to the blog</h5>
      </div>

      <div>
        <h5 className='pb-2'>Recent Articles</h5>
        <div className='border-l-0 md:border-l pb-5 px-5'>
          {posts.map(post => <ArticleCard key={post.data.title} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export function getStaticProps() {
  const posts = articleFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(ARTICLES_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data: {
        ...data,
        wordCount: content.split(/\s+/gu).length,
        readingTime: readingTime(content).text,
      } as ArticleData,
      filePath,
    };
  }).slice(3);

  return { props: { posts } };
}

export default Homepage;
