import { ArticleType } from '../../components/types';
import BreadcrumbTrail from '../../components/seo/BreadcrumbTrail';
import StructuredData from '../../components/seo/StructuredData';
import { getPostMetadata } from '../../utils/mdxUtils';
import InfiniteArticleList from '../../components/article/InfiniteArticleList';
import {
  buildBreadcrumbSchema,
  buildCollectionBreadcrumbs,
  buildCollectionSchema,
  buildMetadata,
} from '../../utils/seo';

const miscDescription =
  'Essays on books, science, ethics, family, film, and the non-technical side of philp.io.';
const miscBreadcrumbs = buildCollectionBreadcrumbs('Misc', '/misc');

export const metadata = buildMetadata({
  title: 'Essays on books, science, ethics, film, and family',
  description: miscDescription,
  pathname: '/misc',
});

export default function Misc() {
  const posts = getPostMetadata()
    .filter((v) => !v.data.draft)
    .filter((v) => v.data.category !== ArticleType.TECHNOLOGY)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return (
    <section className="pb-32 relative">
      <StructuredData data={buildBreadcrumbSchema(miscBreadcrumbs)} />
      <StructuredData
        data={buildCollectionSchema({
          title: 'Misc',
          description: miscDescription,
          pathname: '/misc',
          posts,
        })}
      />

      <div className="absolute left-0 top-0 w-1/4 h-px bg-accent opacity-40"></div>

      <header className="mb-12 pt-6 md:pt-10 max-w-3xl">
        <BreadcrumbTrail items={miscBreadcrumbs} />
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary leading-tight">
          Misc
        </h1>
        <p className="mt-4 text-base md:text-lg text-secondary leading-relaxed">
          Writing on the things that sit outside the technical pile: books, science, family,
          ethics, and everything else.
        </p>
      </header>

      <div className="asymmetric-element">
        <InfiniteArticleList allPosts={posts} initialPostCount={10} />
      </div>
    </section>
  );
}
