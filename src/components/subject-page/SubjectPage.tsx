import React, { FunctionComponent } from 'react';
import SubjectPageBanner from './SubjectPageBanner';
import styled from 'styled-components';
import subjectBackground from '../../assets/images/subject-background.jpg';
import SubjectPageContent from './SubjectPageContent';
import { IPostCollection } from '../../model/PostCollection.model';

const SubjectPageContainer = styled.div`
    overflow: auto;
    font-family: 'Roboto Condensed', sans-serif !important;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    position: relative;
    left: 0px;
    right: 0px;
    top: 0px;
    backface-visibility: hidden;
    transition: -webkit-transform 0.25s ease-in-out 0s;
  `,
  Wrapper = styled.div`
    box-sizing: border-box;
    overflow: auto;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    background: url(${subjectBackground}) repeat;
  `;

type SubjectPageProps = {
  post: IPostCollection;
  sidebarPresent?: boolean;
};

const SubjectPage: FunctionComponent<SubjectPageProps> = ({ post, sidebarPresent = true, children }) => (
  <SubjectPageContainer>
    <Wrapper>
      <SubjectPageBanner post={post} />
      <SubjectPageContent post={post} sidebarPresent={sidebarPresent}>
        {children}
      </SubjectPageContent>
    </Wrapper>
  </SubjectPageContainer>
);

export default SubjectPage;
