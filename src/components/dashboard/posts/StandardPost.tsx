import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IPostCollection } from '../../../assets/PostCollection';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import PostInformation from './PostInformation';

const RootContainer = styled.div`
    background-color: #dcdcdc;
    color: #ffc300;
    display: flex;
    width: 100%;
    font-family: 'Roboto Condensed', sans-serif;
    flex: 1;
  `,
  ImageContainer = styled.div`
    cursor: pointer;
  `;

type PostContainerProps = {
  post: IPostCollection;
  orientation: 'left' | 'right';
};

const StandardPost: FunctionComponent<PostContainerProps & RouteComponentProps> = ({ post, orientation, history }) => {
  const RoundedImage = (
    <ImageContainer onClick={() => history.push(post.link)}>
      <Image
        roundedCircle
        src={post.widgetImage}
        alt={post.widgetImageAlt}
        width={285}
        height={275}
        style={{ padding: 15 }}
      />
    </ImageContainer>
  );

  if (orientation === 'left') {
    return (
      <RootContainer>
        {RoundedImage}
        <PostInformation post={post} orientation={orientation} />
      </RootContainer>
    );
  } else {
    return (
      <RootContainer>
        <PostInformation post={post} orientation={orientation} />
        {RoundedImage}
      </RootContainer>
    );
  }
};

export default withRouter(StandardPost);
