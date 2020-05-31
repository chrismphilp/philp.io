import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IPostCollection } from '../../../assets/PostCollection';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import PostInformation from './PostInformation';

const ImageContainer = styled.img`
    padding: 25px;
    width: 275px;
    height: 275px;
  `,
  RootContainer = styled.div`
    background-color: #dcdcdc;
    color: #ffc300;
    display: flex;
    width: 100%;
    font-family: 'Roboto Condensed', sans-serif;
    cursor: pointer;
    flex: 1;
  `;

type PostContainerProps = {
  post: IPostCollection;
  orientation: 'left' | 'right';
};

const StandardPost: FunctionComponent<PostContainerProps & RouteComponentProps> = ({ post, orientation, history }) => {
  const handlePostSwitch = (link: string): void => history.push(link);

  if (orientation === 'left') {
    return (
      <RootContainer>
        <Image
          roundedCircle
          src={post.widgetImage}
          alt={post.widgetImageAlt}
          onClick={() => handlePostSwitch(post.link)}
          width={275}
          height={275}
        />
        <PostInformation post={post} orientation={orientation} />
      </RootContainer>
    );
  } else {
    return (
      <RootContainer>
        <PostInformation post={post} orientation={orientation} />
        <ImageContainer src={post.widgetImage} alt={post.widgetImageAlt} onClick={() => handlePostSwitch(post.link)} />
      </RootContainer>
    );
  }
};

export default withRouter(StandardPost);
