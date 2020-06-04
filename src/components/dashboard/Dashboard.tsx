import React, { FunctionComponent, useState } from 'react';
import PostContainer from './posts/PostWidget';
import Banner from './header/Banner';
import { IPostCollection, PostCollection } from '../../assets/posts/PostCollection';
import bannerImage from '../../assets/images/banner.jpg';

const Dashboard: FunctionComponent = () => {
  const [posts] = useState<IPostCollection[]>(PostCollection);

  return (
    <>
      <Banner
        image={bannerImage}
        header={'Philpy Thought Shower'}
        subHeader={'A blog where I share my thoughts on topics that interest me.'}
      />
      <PostContainer posts={posts} />
    </>
  );
};

export default Dashboard;
