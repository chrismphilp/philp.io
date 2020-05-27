import React, { FunctionComponent } from 'react';
import FilterContainer from '../filter/FilterContainer';
import { IPostCollection } from '../../../assets/PostCollection';

type BannerProps = {
  updateData: (data: IPostCollection[]) => void;
  posts: IPostCollection[];
};

const Banner: FunctionComponent<BannerProps> = ({ updateData, posts }) => {
  return <FilterContainer updateData={updateData} posts={posts} />;
};

export default Banner;
