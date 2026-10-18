import Link from 'next/link';
import StructuredData from '../components/seo/StructuredData';
import ArticleList from '../components/article/ArticleList';
import { getPublishedPostMetadata, sortPostsByDateDescending } from '../utils/mdxUtils';
import { buildHomeSchema, buildMetadata } from '../utils/seo';

const homeDescription =
  'Essays and articles by Christopher Philp on software, science, ethics, language, books, and everyday life.';
export const metadata = buildMetadata({
  title: 'Essays on software, science, ethics, and books',
  description: homeDescription,
  pathname: '/',
});

export default function Homepage() {
  const posts = sortPostsByDateDescending(getPublishedPostMetadata());
  return (
    <div className="home-page">
      <StructuredData data={buildHomeSchema(posts)} />
      <header className="home-intro">
        <p className="eyebrow">A personal notebook</p>
        <h1>
          Notes from
          <br />a <em>curious</em> <br />
          mind.
        </h1>
        <div className="intro-copy">
          <p>
            I’m Christopher Philp. These are my essays on software, science, ethics, and the
            everyday things worth a second look.
          </p>
          <div className="intro-links">
            <Link href="/tech">
              On technology <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/misc">
              On everything else <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="folio-flower" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </header>
      <section id="writing" className="writing-section" aria-labelledby="writing-heading">
        <div className="section-heading">
          <h2 id="writing-heading">
            Recent writing <span>({posts.length})</span>
          </h2>
          <span>Newest first</span>
        </div>
        <ArticleList posts={posts} />
      </section>
    </div>
  );
}
