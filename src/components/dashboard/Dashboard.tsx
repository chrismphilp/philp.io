import React, { FunctionComponent, useState } from 'react';
import Banner from './header/Banner';
import bannerImage from '../../assets/images/banner.jpg';
import PostContainer from './posts/PostContainer';
import { PostCollection } from '../../assets/posts/PostCollection';
import { IPostCollection } from '../../model/PostCollection.model';
import { splitArrayIntoGroups } from '../../util/data.util';

const Dashboard: FunctionComponent = () => {
  const [posts] = useState<IPostCollection[]>(PostCollection.sort((a: any, b: any) => b.date - a.date)),
    [filteredPosts, setFilteredPosts] = useState<IPostCollection[][]>(splitArrayIntoGroups(posts, 3)),
    [searchText, setSearchText] = useState<string>(''),
    onSearch = (event: React.MouseEvent) => {
      event.preventDefault();
      setFilteredPosts(
        splitArrayIntoGroups(
          (searchText === ''
            ? posts
            : posts.filter((value) => value.title.toLowerCase().includes(searchText.toLowerCase()))
          ).sort((a: any, b: any) => b.date - a.date),
          3,
        ),
      );
    };

  return (
    <>
      <Banner
        image={bannerImage}
        header={'Philpy Thought Shower'}
        subHeader={'A blog where I share my thoughts on topics that interest me.'}
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={onSearch}
      />
      <PostContainer posts={filteredPosts} />
    </>
  );
};

export default Dashboard;
