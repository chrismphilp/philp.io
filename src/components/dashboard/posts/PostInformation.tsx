import React, { FunctionComponent } from 'react';
import { IPostCollection } from '../../../assets/PostCollection';
import styled from 'styled-components';

type InformationContainerProps = {
  orientation: 'left' | 'right';
};

const InformationContainer = styled.div`
    flex: 7;
    border-left: ${(props: InformationContainerProps) => (props.orientation === 'left' ? '1px solid black' : 0)};
    border-right: ${(props: InformationContainerProps) => (props.orientation === 'right' ? '1px solid black' : 0)};
  `,
  TitleText = styled.h2`
    font-size: 52px;
  `;

type PostContainerProps = {
  post: IPostCollection;
  orientation: 'left' | 'right';
};

const PostInformation: FunctionComponent<PostContainerProps> = ({ post, orientation }) => {
  return (
    <InformationContainer orientation={orientation}>
      <TitleText>{post.title}</TitleText>
      <h5>Category: {post.category}</h5>
      <h5>Date: {post.date}</h5>
    </InformationContainer>
  );
};

export default PostInformation;
