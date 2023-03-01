import path from 'path';
import fs from 'fs';
import { articleFilePaths, ARTICLES_PATH } from '../../utils/mdxUtils';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Article from '../../components/article/Article';
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';

const Articles = ({ source, frontMatter }) => {
  return (
    <main className='flex flex-col items-center py-2'>
      <Article frontMatter={frontMatter}>
        <MDXRemote {...source} />
      </Article>
    </main>
  );
};

export const getStaticProps = async ({ params }) => {
  const articleFilePath = path.join(ARTICLES_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(articleFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        rehypeCodeTitles,
        rehypePrism,
      ],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = articleFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Articles;
