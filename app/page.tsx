import StructuredData from '../components/seo/StructuredData';
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

  return <StructuredData data={buildHomeSchema(posts)} />;
}
