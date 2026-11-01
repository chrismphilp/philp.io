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

const techDescription =
  'Technical writing on TypeScript, Next.js, Rust, Git, and practical software engineering.';
const techBreadcrumbs = buildCollectionBreadcrumbs('Tech', '/tech');

export const metadata = buildMetadata({
  title: 'Technical essays on TypeScript, Next.js, Rust, and Git',
  description: techDescription,
  pathname: '/tech',
});

export default function Tech() {
  const posts = getPostMetadata()
    .filter((v) => !v.data.draft)
    .filter((v) => v.data.category === ArticleType.TECHNOLOGY)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return (
    <section className="collection-page">
      <StructuredData data={buildBreadcrumbSchema(techBreadcrumbs)} />
      <StructuredData
        data={buildCollectionSchema({
          title: 'Tech',
          description: techDescription,
          pathname: '/tech',
          posts,
        })}
      />

      <header className="collection-intro">
        <BreadcrumbTrail items={techBreadcrumbs} />
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-primary leading-tight">
          The technology shelf.
        </h1>
        <p className="mt-4 text-base md:text-lg text-secondary leading-relaxed">
          Notes on software engineering, front-end architecture, tooling, and the odd language
          feature worth keeping.
        </p>
      </header>

      <Bookshelf posts={posts} collection="tech" />
    </section>
  );
}
