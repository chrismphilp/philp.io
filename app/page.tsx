import StructuredData from '../components/seo/StructuredData';
import InfiniteArticleList from '../components/article/InfiniteArticleList';
import {
  getPublishedPostMetadata,
  sortPostsByDateDescending,
} from '../utils/mdxUtils';
import { buildHomeSchema, buildMetadata, siteConfig } from '../utils/seo';

const homeDescription =
  'Essays and articles by Christopher Philp on software, science, ethics, language, books, and everyday life.';

export const metadata = buildMetadata({
  absoluteTitle: siteConfig.siteName,
  description: homeDescription,
  pathname: '/',
});

export default function Homepage() {
  const posts = sortPostsByDateDescending(getPublishedPostMetadata());

  return (
    <section className="pb-16 relative">
      <StructuredData data={buildHomeSchema(posts)} />

      <header className="mb-12 pt-6 md:pt-10 max-w-3xl">
        <p className="text-xs tracking-[0.3em] uppercase text-accent-dark mb-4">
          Recent Writing
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary leading-tight">
          Essays on software, science, ethics, and the rest.
        </h1>
        <p className="mt-4 text-base md:text-lg text-secondary leading-relaxed">
          Christopher Philp writes about engineering, books, language, and everyday life.
        </p>
      </header>

      <div className="asymmetric-element">
        <InfiniteArticleList allPosts={posts} initialPostCount={10} />
      </div>
    </section>
  );
}
