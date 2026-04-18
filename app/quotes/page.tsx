import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { buildMetadata } from '../../utils/seo';
import { QUOTES_PATH } from '../../utils/mdxUtils';

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
    <main className="flex flex-col items-stretch md:items-center py-6 md:py-8">
      <section className="w-full paper-surface rounded-[2rem] px-6 py-7 md:px-8 md:py-8 mb-8">
        <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-secondary">
          Quotes shelf
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl text-primary font-light tracking-[-0.03em]">
          A small page for sentences worth keeping.
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg leading-8 text-secondary">
          Not a complete commonplace book. Just enough to return to.
        </p>
      </section>

      <article className="prose dark:prose-invert prose-lg prose-a:no-underline text-sm sm:text-base max-w-[72ch]">
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
