import { ArticleType } from '../../components/types';
import { buildStaticMetadata } from '../../utils/siteMetadata';
import { getPostMetadata } from '../../utils/mdxUtils';
import InfiniteArticleList from '../../components/article/InfiniteArticleList';

export const metadata = buildStaticMetadata({
  title: 'Misc',
  description: 'Writing on science, ethics, film, family, and everything else.',
  path: '/misc',
});

export default function Misc() {
  const posts = getPostMetadata()
    .filter((v) => !v.data.draft)
    .filter((v) => v.data.category !== ArticleType.TECHNOLOGY)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return (
    <section className="pb-32 relative">
      <div className="absolute left-0 top-0 w-1/4 h-px bg-accent opacity-40"></div>

      <h3 className="text-lg tracking-widest mb-12 pt-2 font-light" />

      <div className="asymmetric-element">
        <InfiniteArticleList allPosts={posts} initialPostCount={5} />
      </div>
    </section>
  );
}
