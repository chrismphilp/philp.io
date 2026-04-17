import path from 'path';
import fs from 'fs';
import { buildStaticMetadata } from '../../utils/siteMetadata';
import { QUOTES_PATH } from '../../utils/mdxUtils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

export const metadata = buildStaticMetadata({
  title: 'Quotes',
  description: 'A collection of favourite quotes and excerpts.',
  path: '/quotes',
});

export default function Quotes() {
  const quotesFilePath = path.join(QUOTES_PATH, 'quotes.mdx');
  const source = fs.readFileSync(quotesFilePath, 'utf8');
  const { content } = matter(source);

  return (
    <main className="flex flex-col items-stretch md:items-center py-5">
      <article className="prose dark:prose-invert prose-lg prose-a:no-underline text-sm sm:text-base">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              remarkPlugins: [remarkGfm] as any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              rehypePlugins: [rehypeSlug] as any,
            },
          }}
        />
      </article>
    </main>
  );
}
