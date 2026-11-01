import { ArticleType } from '../../components/types';
import BreadcrumbTrail from '../../components/seo/BreadcrumbTrail';
import StructuredData from '../../components/seo/StructuredData';
import { getPostMetadata } from '../../utils/mdxUtils';
import Bookshelf from '../../components/library/Bookshelf';
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
    <section className="collection-page">
      <StructuredData data={buildBreadcrumbSchema(miscBreadcrumbs)} />
      <StructuredData
        data={buildCollectionSchema({
          title: 'Misc',
          description: miscDescription,
          pathname: '/misc',
          posts,
        })}
      />

      <header className="collection-intro">
        <BreadcrumbTrail items={miscBreadcrumbs} />
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary leading-tight">
          Life & everything.
        </h1>
        <p className="mt-4 text-base md:text-lg text-secondary leading-relaxed">
          Writing on the things that sit outside the technical pile: books, science, family,
          ethics, and everything else.
        </p>
      </header>

      <Bookshelf posts={posts} collection="misc" />
    </section>
  );
}
