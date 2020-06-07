import React, { FunctionComponent, ReactElement } from 'react';
import styled from 'styled-components';
import { IPostCollection } from '../../model/PostCollection.model';

const PageBanner = styled.div`
    height: 100%;
    position: relative;
    padding: 0em 3em;
    color: #fff;
  `,
  PageBannerContainer = styled.div`
    height: 100%;
    color: #fff;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    margin-left: auto;
    margin-right: auto;
    width: 1200px;
    background: #fff;
  `,
  PageBannerRow = styled.div`
    height: 100%;
    color: #fff;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    margin-left: -50px;
  `,
  PageBannerSection = styled.section`
    height: 100%;
    color: #fff;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: block;
    box-sizing: border-box;
    padding-left: 50px;
    margin-bottom: 0;
    padding-top: 0 !important;
  `,
  ImageLink = styled.a`
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    text-decoration: none;
    color: #333;
    display: block;
    width: 100%;
    padding: 0em 3em;
  `,
  Image = styled.img`
    height: 100%;
    color: #333;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: block;
    width: 100%;
  `;

type SubjectPageBannerProps = {
  post: IPostCollection;
  children?: ReactElement;
};

const SubjectPageBanner: FunctionComponent<SubjectPageBannerProps> = ({ post }) => {
  return (
    <PageBanner>
      <PageBannerContainer>
        <PageBannerRow>
          <PageBannerSection>
            <ImageLink>
              <Image src={post.widgetImage}></Image>
            </ImageLink>
          </PageBannerSection>
        </PageBannerRow>
      </PageBannerContainer>
    </PageBanner>
  );
};

export default SubjectPageBanner;
