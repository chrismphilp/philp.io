import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IPostCollection } from '../../model/PostCollection.model';

type TextContainerStyleProps = {
  sidebarPresent: boolean;
};

const TextContainer = styled.div`
    height: 100%;
    text-align: justify;
    overflow: inherit;
    float: left;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    width: ${(props: TextContainerStyleProps) => (props.sidebarPresent ? '66.6666666667%' : '100%')};
    float: left;
    box-sizing: border-box;
    padding-left: 50px;
    padding-top: 0 !important;
  `,
  TextRow = styled.div`
    height: 100%;
    overflow: inherit;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    margin-left: -50px;
  `,
  TextContent = styled.div`
    height: 100%;
    overflow: inherit;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    float: left;
    box-sizing: border-box;
    padding-left: 50px;
    padding-top: 0 !important;
  `,
  TextSection = styled.section`
    height: 100%;
    overflow: inherit;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1.25em !important;
    font: inherit;
    vertical-align: baseline;
    display: block;
    margin-bottom: 0;
  `,
  TextHeader = styled.header`
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: block;
    margin-bottom: 2em;
  `,
  TextHeaderTitle = styled.h2`
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    line-height: 1em;
    text-transform: uppercase;
    font-weight: 200;
    font-size: 2em;
  `,
  TextHeaderSubTitle = styled.span`
    height: 100%;
    box-sizing: border-box;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    display: block;
    margin: 0.5em 0 0 0;
    padding: 0 0 0.5em 0;
    font-size: 1.6em;
    color: #00a6fa;
  `;

type PostParagraphProps = {
  post: IPostCollection;
  sidebarPresent: boolean;
};

const SubjectPageText: FunctionComponent<PostParagraphProps> = ({ post, sidebarPresent, children }) => {
  return (
    <TextContainer sidebarPresent={sidebarPresent}>
      <TextRow>
        <TextContent>
          <TextSection>
            <TextHeader>
              <TextHeaderTitle>{post.title}</TextHeaderTitle>
              <TextHeaderSubTitle>{post.subTitle}</TextHeaderSubTitle>
              {children}
            </TextHeader>
          </TextSection>
        </TextContent>
      </TextRow>
    </TextContainer>
  );
};

export default SubjectPageText;
