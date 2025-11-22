import { getPostMetadata, PostMeta } from '../utils/mdxUtils';
import Head from 'next/head';
import { FC } from 'react';
import InfiniteArticleList from 'components/article/InfiniteArticleList';

type HomepageProps = {
  posts: PostMeta[];
};

const Homepage: FC<HomepageProps> = ({ posts }) => (
  <>
    <Head>
      <title>Christopher Philp</title>
    </Head>

    <section className="pb-16 relative">
      <h3 className="text-lg tracking-widest mb-12 pt-2 font-light" />

      <div className="asymmetric-element">
        <InfiniteArticleList allPosts={posts} initialPostCount={5} />
      </div>
    </section>
  </>
);

export function getStaticProps() {
  const posts = getPostMetadata()
    .filter((v) => !v.data.draft)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return { props: { posts } };
}

export default Homepage;
