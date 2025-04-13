import ArticleCard from 'components/article/ArticleCard';
import { ArticleType } from 'components/types';
import { getPosts, PostData } from 'utils/mdxUtils';
import Head from 'next/head';
import { FC } from 'react';

type MiscProps = {
  posts: PostData[];
};

const Misc: FC<MiscProps> = ({ posts }) => (
  <>
    <Head>
      <title>Misc</title>
    </Head>
    <section className="pb-32 relative">
      <div className="absolute left-0 top-0 w-1/4 h-px bg-accent opacity-40"></div>

      <h3 className="text-lg tracking-widest mb-12 pt-2 font-light"/>
      
      <div className="asymmetric-element space-y-6">
        {posts.map((post) => (
          <ArticleCard key={post.data.title} post={post} />
        ))}
      </div>
      
      <div className="absolute bottom-0 left-1/4 w-16 h-16 border-b border-l border-accent-subtle opacity-20 hidden md:block"></div>
    </section>
  </>
);

export function getStaticProps() {
  const posts = getPosts()
    .filter((v) => !v.data.draft)
    .filter((v) => v.data.category !== ArticleType.TECHNOLOGY)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return { props: { posts } };
}

export default Misc;
