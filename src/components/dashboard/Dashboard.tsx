import React, { FunctionComponent, useState } from 'react';
import Banner from './header/Banner';
import bannerImage from '../../assets/images/banner.jpg';
import PostContainer from './posts/PostContainer';
import { PostCollection } from '../../assets/posts/PostCollection';
import { IPostCollection } from '../../model/PostCollection.model';
import { splitArrayIntoGroups } from '../../util/data.util';

const Dashboard: FunctionComponent = () => {
  const [posts] = useState<IPostCollection[][]>(
    splitArrayIntoGroups(
      PostCollection.sort((a: any, b: any) => b.date - a.date),
      3,
    ),
  );

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
