import { getPosts, PostData } from '../utils/mdxUtils';
import ArticleCard from 'components/article/ArticleCard';
import Head from 'next/head';
import HandWave from '../components/animation/HandWave';
import { FC } from 'react';

type HomepageProps = {
  posts: PostData[];
};

const Homepage: FC<HomepageProps> = ({ posts }) => (
  <>
    <Head>
      <title>Christopher Philp</title>
    </Head>

    <section className="pb-32 relative">
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
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1))
    .slice(0, 5);

  return { props: { posts } };
}

export default Homepage;
