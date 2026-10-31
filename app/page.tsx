import StructuredData from '../components/seo/StructuredData';
import Bookshelf from '../components/library/Bookshelf';
import ReadingRoom from '../components/library/ReadingRoom';
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
    <div className="library-home">
      <StructuredData data={buildHomeSchema(posts)} />

      <header className="library-welcome">
        <p className="eyebrow">
          <span aria-hidden="true">✦</span> A SMALL LIBRARY ON THE INTERNET{' '}
          <span aria-hidden="true">✦</span>
        </p>
        <h1>
          Come in. <em>Stay a while.</em>
        </h1>
        <p>
          I’m Christopher. These are my thoughts on software, life, and everything between.
          <br className="desktop-break" /> The fire’s on, the tea’s warm, and there’s always
          another book.
        </p>
      </header>
      <ReadingRoom />
      <Bookshelf posts={posts} />
    </div>
  );
}
