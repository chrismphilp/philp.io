import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ArticleCard from 'components/article/ArticleCard';
import readingTime from 'reading-time';
import { articleFilePaths, ARTICLES_PATH } from 'utils/mdxUtils';
import Head from 'next/head';
import { ArticleData } from '../types';

const Articles = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Tech</title>
      </Head>
      <div className='max-w-2xl mx-auto py-8'>
        <div className=''>
          {posts.map(post => <ArticleCard key={post.data.title} post={post} />)}
        </div>
      </div>
    </>
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
  }).filter(v => v.data.category === 'Technology')
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return {
    props: {
      posts,
    },
  };
}

export default Articles;
