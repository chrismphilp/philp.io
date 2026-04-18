import { ArticleType } from '../../components/types';
import StructuredData from '../../components/seo/StructuredData';
import { getPostMetadata } from '../../utils/mdxUtils';
import InfiniteArticleList from '../../components/article/InfiniteArticleList';
import { buildCollectionSchema, buildMetadata } from '../../utils/seo';

const miscDescription =
  'Essays on books, science, ethics, family, film, and the non-technical side of philp.io.';

export const metadata = buildMetadata({
  title: 'Misc',
  description: miscDescription,
  pathname: '/misc',
});

export default function Misc() {
  const posts = getPostMetadata()
    .filter((v) => !v.data.draft)
    .filter((v) => v.data.category !== ArticleType.TECHNOLOGY)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return (
    <section className="pb-24 md:pb-28 relative pt-6 md:pt-8">
      <StructuredData
        data={buildCollectionSchema({
          title: 'Misc',
          description: miscDescription,
          pathname: '/misc',
          posts,
        })}
      />

      <div className="paper-surface rounded-[2rem] px-6 py-7 md:px-8 md:py-8 mb-10">
        <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-secondary">
          Misc archive
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl text-primary font-light tracking-[-0.03em]">
          Essays outside the software lane.
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg leading-8 text-secondary">
          {posts.length} pieces on language, ethics, science, film, and anything else that
          refused to fit a single category.
        </p>
      </div>

      <div className="asymmetric-element">
        <InfiniteArticleList allPosts={posts} initialPostCount={10} />
      </div>
    </section>
  );
}
