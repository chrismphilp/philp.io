import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

type BannerSectionStyleProps = {
  image: any;
};

const BannerSection = styled.section`
    margin: 0;
    padding: 8em 0 6em 0;
    background-color: #1e2832;
    color: rgba(255, 255, 255, 0.75);
    background-attachment: fixed;
    background-image: url(${(props: BannerSectionStyleProps) => props.image});
    background-size: cover;
    text-align: center;
  `,
  BannerHeader = styled.h2`
    border: 0;
    font: inherit;
    vertical-align: baseline;
    font-size: 3em;
  `,
  BannerSubHeader = styled.p`
    color: #fff;
    font-size: 1.05em;
    margin-bottom: 1.75em;
  `;

type BannerProps = {
  image: any;
  header: string;
  subHeader: string;
};

const Banner: FunctionComponent<BannerProps> = (
  {
    image,
    header,
    subHeader,
  }) => (
  <BannerSection image={image}>
    <BannerHeader>{header}</BannerHeader>
    <BannerSubHeader>{subHeader}</BannerSubHeader>
    <SearchBar />
  </BannerSection>
);

export default Banner;
