import React, { FunctionComponent } from 'react';
import { IPostCollection } from '../../../assets/posts/PostCollection';
import bannerImage from '../../../assets/images/banner.jpg';
import styled from 'styled-components';

const BannerSection = styled.section`
  margin: 0;
  padding: 8em 0 6em 0;
  background-color: #1E2832;
  color: rgba(255, 255, 255, 0.75);
  background-attachment: fixed;
  background-image: url(${bannerImage});
  background-size: cover;
  text-align: center;
`;

const BannerHeader = styled.h2`
  border: 0;
  font: inherit;
  vertical-align: baseline;
  font-size: 2em;
`;

const BannerSubHeader = styled.p`
  color: #fff;
  font-size: 1.05em;
  margin-bottom: 1.75em;
  text-transform: uppercase;
`;

const Banner: FunctionComponent = () =>
  <BannerSection>
    <BannerHeader>Philpy Thought Shower</BannerHeader>
    <BannerSubHeader>A blog where I share my thoughts on topics that interest me.</BannerSubHeader>
  </BannerSection>;

export default Banner;
