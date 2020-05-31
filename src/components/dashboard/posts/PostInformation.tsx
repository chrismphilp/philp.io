import React, { FunctionComponent } from 'react';
import { IPostCollection } from '../../../assets/PostCollection';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type InformationContainerProps = {
  orientation: 'left' | 'right';
};

const InformationContainer = styled.div`
    flex: 7;
    border-left: ${(props: InformationContainerProps) => (props.orientation === 'left' ? '1px solid black' : 0)};
    border-right: ${(props: InformationContainerProps) => (props.orientation === 'right' ? '1px solid black' : 0)};
    padding-left: 15px;
  `,
  TitleText = styled.h2`
    font-size: 52px;
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `;

type PostContainerProps = {
  post: IPostCollection;
  orientation: 'left' | 'right';
};

const PostInformation: FunctionComponent<PostContainerProps & RouteComponentProps> = ({ post, orientation, history }) => {
  return (
    <InformationContainer orientation={orientation}>
      <TitleText onClick={() => history.push(post.link)}>{post.title}</TitleText>
      <h5>Category: {post.category}</h5>
      <h5>Date: {post.date}</h5>
    </InformationContainer>
  );
};

export default withRouter(PostInformation);
