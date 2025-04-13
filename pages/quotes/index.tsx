import path from 'path';
import fs from 'fs';
import { QUOTES_PATH } from 'utils/mdxUtils';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';
import matter from 'gray-matter';

const Quotes = ({ source }) => (
  <main className="flex flex-col items-stretch md:items-center py-5">
    <article className="prose dark:prose-invert prose-lg prose-a:no-underline text-sm sm:text-base">
      <MDXRemote {...source} />
    </article>
  </main>
);

export async function getStaticProps({ params }) {
  const quotesFilePath = path.join(QUOTES_PATH, 'quotes.mdx');
  const source = fs.readFileSync(quotesFilePath);
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      format: 'mdx',
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      wordCount: content.split(/\s+/g).length,
      readingTime: readingTime(content).text,
    },
  };
}

export default Quotes;
