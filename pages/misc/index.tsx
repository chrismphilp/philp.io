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
    <div className="max-w-2xl mx-auto py-8">
      {posts.map((post) => (
        <ArticleCard key={post.data.title} post={post} />
      ))}
    </div>
  </>
);

export function getStaticProps() {
  const posts = getPosts()
    .filter((v) => !v.data.draft)
    .filter((v) => v.data.category !== ArticleType.TECHNOLOGY)
    .sort((post1, post2) => (post1.data.date > post2.data.date ? -1 : 1));

  return {
    props: {
      posts,
    },
  };
}

export default Misc;
