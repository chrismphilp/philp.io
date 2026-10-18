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
        <p className="eyebrow">
          <span className="signal-dot" aria-hidden="true" /> A personal collection of ideas
        </p>
        <h1>
          Following the
          <br />
          <span>interesting bits.</span>
        </h1>
        <div className="intro-copy">
          <p>
            Software. Science. The rest of life.
            <br />
            Essays and observations by Christopher Philp.
          </p>
          <a className="text-link" href="#writing">
            Start exploring <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>
      <section id="writing" className="writing-section" aria-labelledby="writing-heading">
        <div className="section-heading">
          <h2 id="writing-heading">
            Writing archive <span>({posts.length})</span>
          </h2>
          <span>Newest first</span>
        </div>
        <ArticleList posts={posts} />
      </section>
    </div>
  );
}
