import { ArticleType } from '../../components/types';
import StructuredData from '../../components/seo/StructuredData';
import { getPostMetadata } from '../../utils/mdxUtils';
import InfiniteArticleList from '../../components/article/InfiniteArticleList';
import { buildCollectionSchema, buildMetadata } from '../../utils/seo';

const techDescription =
  'Technical writing on TypeScript, Next.js, Rust, Git, and practical software engineering.';

export const metadata = buildMetadata({
  title: 'Tech',
  description: techDescription,
  pathname: '/tech',
});

export default function Tech() {
  const posts = getPostMetadata()
    .filter((v) => !v.data.draft)
    .filter((v) => v.data.category === ArticleType.TECHNOLOGY)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return (
    <section className="pb-32 relative">
      <StructuredData
        data={buildCollectionSchema({
          title: 'Tech',
          description: techDescription,
          pathname: '/tech',
          posts,
        })}
      />

      <header className="mb-12 pt-6 md:pt-10 max-w-3xl">
        <p className="text-xs tracking-[0.3em] uppercase text-accent-dark mb-4">
          Category
        </p>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary leading-tight">
          Tech
        </h1>
        <p className="mt-4 text-base md:text-lg text-secondary leading-relaxed">
          Notes on software engineering, front-end architecture, tooling, and the odd language feature worth keeping.
        </p>
      </header>

      <div className="asymmetric-element">
        <InfiniteArticleList allPosts={posts} initialPostCount={10} />
      </div>
    </section>
  );
}
