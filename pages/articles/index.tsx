import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ArticleCard from 'components/article/ArticleCard';
import readingTime from 'reading-time';
import { articleFilePaths, ARTICLES_PATH } from 'utils/mdxUtils';

const Articles = ({ posts }) => {
  return (
    <div className='max-w-2xl mx-auto py-5'>
      <div className='border-l-0 md:border-l pb-5 px-5'>
      {posts.map(post => <ArticleCard key={post.data.title} post={post} />)}
      </div>
    </div>
  );
};

export type ArticleData = {
  title: string;
  description: string;
  date: string;
  wordCount: number;
  readingTime: string;
}

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
  }).sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return {
    props: {
      posts,
    },
  };
}

export default Articles;
