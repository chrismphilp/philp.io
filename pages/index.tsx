import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { articleFilePaths, ARTICLES_PATH } from '../utils/mdxUtils';

const Homepage = ({ posts }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-6xl font-bold'>Homepage</h1>
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

export default Homepage;
