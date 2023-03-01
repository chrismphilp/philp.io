import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { articleFilePaths, ARTICLES_PATH } from '../utils/mdxUtils';

const Homepage = ({ posts }) => {
  return (
    <>
      <h1>Home Page</h1>
    </>
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
