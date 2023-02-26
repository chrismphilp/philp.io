import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import SubjectPageSidebar from './SubjectPageSidebar';
import SubjectPageText from './SubjectPageText';
import { IPostCollection } from '../../src/model/PostCollection.model';

const Wrapper = styled.div`
  height: 100%;
  min-width: 1200px;
  overflow: inherit;
  position: relative;
  padding: 0em 3em;
`;
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
`;
const SubjectPageMain = styled.div`
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
`;
const SubjectPageContentRow = styled.div`
  overflow: inherit;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
`;

type PostParagraphProps = {
  post: IPostCollection;
  sidebarPresent: boolean;
};

const SubjectPageContent: FunctionComponent<PostParagraphProps> = ({
  post,
  sidebarPresent,
  children,
}) => {
  return (
    <Wrapper>
      <SubjectPageContentContainer>
        <SubjectPageMain>
          <SubjectPageContentRow>
            <SubjectPageText post={post} sidebarPresent={sidebarPresent}>
              {children}
            </SubjectPageText>
            {sidebarPresent && (
              <SubjectPageSidebar
                sidebarHeader={post.sidebarHeader}
                sidebarSubHeader={post.sidebarSubHeader}
                dateCollection={post.dateCollection}
              />
            )}
          </SubjectPageContentRow>
        </SubjectPageMain>
      </SubjectPageContentContainer>
    </Wrapper>
  );
};

export default SubjectPageContent;
