import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const SmallTitle = styled.h2`
  margin: 50px 0 20px 0;
  font-weight: 300;
  color: #888;
`;

const Paragraph = styled.p`

`;

type PostParagraphProps = {
  subTitle: string;
}

const PostParagraph: FunctionComponent<PostParagraphProps> = ({ subTitle, children }) => {
  return (
    <>
      <SmallTitle>{subTitle}</SmallTitle>
      <Paragraph>{children}</Paragraph>
    </>
  );
};

export default PostParagraph;