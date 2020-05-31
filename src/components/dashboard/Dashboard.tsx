import React, { FunctionComponent, useState } from 'react';
import PostContainer from './posts/PostContainer';
import Banner from './header/Banner';
import { IPostCollection, PostCollection } from '../../assets/PostCollection';
import styled from 'styled-components';
import device from '../../util/device-sizes';

const BannerContainer = styled.div`
    @media ${device.mobile} {
      display: flex;
    }
    @media ${device.tablet} {
      display: flex;
      padding: 25px 75px 25px 75px;
    }
    @media ${device.laptop} {
      display: flex;
      padding: 25px 75px 25px 75px;
    }
  `,
  Dashboard: FunctionComponent = () => {
    const [posts] = useState<IPostCollection[]>(PostCollection),
      [filteredPosts, setFilteredPosts] = useState<IPostCollection[]>(PostCollection),
      updateData = (data: IPostCollection[]): void => setFilteredPosts(data);

    return (
      <>
        <BannerContainer>
          <Banner updateData={updateData} posts={posts} />
        </BannerContainer>
        <PostContainer posts={filteredPosts} />
      </>
    );
  };

export default Dashboard;
