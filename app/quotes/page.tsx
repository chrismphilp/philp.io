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
    <section className="reading-article quotes-page">
      <header className="reading-header">
        <h1 className="collection-title">Quotes</h1>
        <p className="reading-description">
          A private-ish reference page of lines and passages worth returning to.
        </p>
      </header>

      <article className="prose reading-body">
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
