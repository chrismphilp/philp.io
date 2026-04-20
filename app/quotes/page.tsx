import path from 'path';
import fs from 'fs';
import { QUOTES_PATH } from '../../utils/mdxUtils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { buildMetadata } from '../../utils/seo';

export const metadata = buildMetadata({
  title: 'Quotes',
  description: 'Selected quotes and passages collected for reference.',
  pathname: '/quotes',
  noIndex: true,
});

export default function Quotes() {
  const quotesFilePath = path.join(QUOTES_PATH, 'quotes.mdx');
  const source = fs.readFileSync(quotesFilePath, 'utf8');
  const { content } = matter(source);

  return (
    <section className="flex flex-col items-stretch md:items-center py-5">
      <header className="w-full max-w-3xl mb-10">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary leading-tight">
          Quotes
        </h1>
        <p className="mt-4 text-base md:text-lg text-secondary leading-relaxed">
          A private-ish reference page of lines and passages worth returning to.
        </p>
      </header>

      <article className="prose dark:prose-invert prose-lg text-sm sm:text-base">
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
    </section>
  );
}
