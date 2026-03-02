import { getPostMetadata } from '../utils/mdxUtils';
import InfiniteArticleList from '../components/article/InfiniteArticleList';

export const metadata = {
  title: 'Christopher Philp',
};

export default function Homepage() {
  const posts = getPostMetadata()
    .filter((v) => !v.data.draft)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return (
    <section className="pb-16 relative">
      <h3 className="text-lg tracking-widest mb-12 pt-2 font-light" />

      <div className="asymmetric-element">
        <InfiniteArticleList allPosts={posts} initialPostCount={5} />
      </div>
    </section>
  );
}
