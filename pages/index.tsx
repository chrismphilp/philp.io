import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { articleFilePaths, ARTICLES_PATH } from '../utils/mdxUtils';
import ArticleCard from 'components/article/ArticleCard';
import { ArticleData } from 'components/types';
import readingTime from 'reading-time';
import Head from 'next/head';
import HandWave from '../components/animation/HandWave';

const Homepage = ({ posts }) => (
  <>
    <Head>
      <title>Home</title>
    </Head>

    <div className='max-w-2xl sm:mx-auto'>
      <div className='prose dark:prose-invert pt-7 pb-9'>
        <h2>Welcome to the blog <HandWave /></h2>
        <ul>
          <li>I'm Chris, a software engineer from the UK 🇬🇧</li>
          <li>Programming in the financial sector 🏦</li>
          <li>Writing about topics that interest me ✏️</li>
          <li>Learning new things every day 💡</li>
        </ul>
      </div>

      <div className='prose dark:prose-invert'>
        <h3 className='pb-2'>Recent Articles 📚</h3>
      </div>
      <div className='border-l-0 py-5'>
        <div className='md:border-l md:px-5'>
          {posts.map(post => <ArticleCard key={post.data.title} post={post} />)}
        </div>
      </div>
    </div>
  </>
);

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
  }).filter(v => !v.data.draft)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1))
    .slice(0, 5);

  return { props: { posts } };
}

export default Homepage;
