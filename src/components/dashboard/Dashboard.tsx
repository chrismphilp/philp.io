import React, { FunctionComponent, useState } from 'react';
import PostContainer from './posts/PostContainer';
import Banner from './header/Banner';
import { IPostCollection, PostCollection } from '../../assets/posts/PostCollection';

const Dashboard: FunctionComponent = () => {
  const [posts] = useState<IPostCollection[]>(PostCollection);

  return (
    <>
      <Banner/>
      <PostContainer posts={posts}/>
    </>
  );
};

export default Dashboard;
