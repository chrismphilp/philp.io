import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { articleFilePaths, ARTICLES_PATH } from '../utils/mdxUtils';
import ArticleCard from 'components/article/ArticleCard';
import readingTime from 'reading-time';
import Head from 'next/head';
import { ArticleData } from './types';
import { motion } from 'framer-motion';

const Homepage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className='max-w-2xl mx-auto pt-5'>
        <div className='prose dark:prose-invert pt-7 pb-9'>
          <h2>Welcome to the blog <HandWaving/></h2>
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
        <div className='border-l-0 md:border-l px-5'>
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
  }).sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1)).slice(0, 5);

  return { props: { posts } };
}

const HandWaving = () => {
  return (
    <motion.div
      className='inline-block pl-1'
      animate={{ rotate: 20 }}
      transition={{
        from: 0,
        duration: 0.75,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        type: 'tween',
      }}>
      👋
    </motion.div>
  );
}
export default Homepage;
