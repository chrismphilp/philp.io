import path from 'path';
import fs from 'fs';
import { articleFilePaths, ARTICLES_PATH } from '../../utils/mdxUtils';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Article from '../../components/article/Article';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';
import matter from 'gray-matter';

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
    parseFrontmatter: true,
    mdxOptions: {
      format: 'mdx',
      remarkPlugins: [
        remarkGfm
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [rehypeAutolinkHeadings, { behavior: 'wrap', properties: {className: ['anchor'] } }],
        [rehypePrettyCode, {
          theme: {
            dark: "monokai",
            light: "one-dark-pro",
          },
          keepBackground: true,
        }]
      ],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content).text,
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
