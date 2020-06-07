import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import SubjectPageSidebar from './SubjectPageSidebar';
import SubjectPageText from './SubjectPageText';
import { IPostCollection } from '../../assets/posts/model/PostCollection.model';

const SubjectPageContentContainer = styled.div`
    width: 1200px;
    overflow: inherit;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    margin-left: auto;
    margin-right: auto;
  `,
  SubjectPageMain = styled.div`
    box-sizing: border-box;
    overflow: inherit;
    margin: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    position: relative;
    background: #fff;
    padding: 4em 3em 6em 3em;
  `,
  SubjectPageContentRow = styled.div`
    overflow: inherit;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
  `;

type PostParagraphProps = {
  post: IPostCollection;
};

const SubjectPageContent: FunctionComponent<PostParagraphProps> = ({ post, children }) => {
  return (
    <SubjectPageContentContainer>
      <SubjectPageMain>
        <SubjectPageContentRow>
          <SubjectPageText post={post}>{children}</SubjectPageText>
          <SubjectPageSidebar
            sidebarHeader={post.sidebarHeader}
            sidebarSubHeader={post.sidebarSubHeader}
            dateCollection={post.dateCollection}
          />
        </SubjectPageContentRow>
      </SubjectPageMain>
    </SubjectPageContentContainer>
  );
};

export default SubjectPageContent;
