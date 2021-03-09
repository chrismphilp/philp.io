import React, { FunctionComponent, useEffect, useState } from 'react';
import Banner from './header/Banner';
import bannerImage from '../../assets/images/banner.jpg';
import PostContainer from './posts/PostContainer';
import { PostCollection } from '../../assets/posts/PostCollection';
import { IPostCollection } from '../../model/PostCollection.model';
import { splitArrayIntoGroups } from '../../util/data.util';
import { IAppState } from '../../redux';
import { connect, ConnectedProps } from 'react-redux';
import ReactGA from 'react-ga';

const Dashboard: FunctionComponent<ConnectedProps<typeof connector>> = ({ searchValue }) => {
  useEffect(() => {
    ReactGA.initialize('UA-44048042-2', { testMode: process.env.NODE_ENV === 'test' });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const [posts] = useState<IPostCollection[]>(
    PostCollection.sort((a: any, b: any) => b.date - a.date),
  );

  const getFilteredPosts = () =>
    splitArrayIntoGroups(searchValue === '' ? posts : posts.filter(filterPostCollection), 3);

  const filterPostCollection = (value: IPostCollection): boolean => {
    return (
      value.title.toLowerCase().includes(searchValue) ||
      value.subTitle.toLowerCase().includes(searchValue) ||
      value.keywords.map((v) => v.includes(searchValue)).some((v) => v)
    );
  };

  return (
    <>
      <Banner
        image={bannerImage}
        header={'Philpy Thought Shower'}
        subHeader={'A blog where I share my thoughts on topics that interest me.'}
      />
      <PostContainer posts={getFilteredPosts()} />
    </>
  );
};

const mapStateToProps = (
  state: IAppState,
): {
  searchValue: string;
} => ({
  searchValue: state.dashboardReducer.searchValue,
});

const connector = connect(mapStateToProps);

export default connector(Dashboard);
