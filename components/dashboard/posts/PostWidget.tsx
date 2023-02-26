import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IPostCollection } from '../../../src/model/PostCollection.model';

type PostArticleStyleProps = {
  orientation: 'left' | 'right';
};

const PostArticle = styled.article`
  color: #777;
  cursor: pointer;
  box-sizing: border-box;
  border: gainsboro solid 1px;
  padding: 0;
  vertical-align: baseline;
  display: flex;
  align-items: center;
  margin: 0 0 3em;
  flex-direction: ${(props: PostArticleStyleProps) =>
    props.orientation === 'left' ? 'row' : 'row-reverse'};
  background-color: #fff;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
`;
const ImageContainer = styled.span`
  width: 55%;
  margin: 0 auto;
`;
const Image = styled.img`
  max-width: 100%;
  border-radius: 0;
  display: block;
`;
const PostInformation = styled.div`
  width: 45%;
  color: #777;
  box-sizing: border-box;
  margin: 0;
  border: 0;
  vertical-align: baseline;
  padding: 2em 3em 0.1em 3em;
`;
const PostInformationHeader = styled.h2`
  color: #555;
  font-size: 1.75em;
  line-height: 1.5em;
`;
const PostInformationSubHeader = styled.p`
  font-size: 1.25em;
  margin: 0 0 2em 0;
`;

type PostWidgetProps = {
  post: IPostCollection;
  orientation: 'left' | 'right';
};

const PostWidget: FunctionComponent<PostWidgetProps & RouteComponentProps> = ({
  post,
  orientation,
  history,
}) => {
  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, link: string) => {
    event.preventDefault();
    history.push(link);
  };

  return (
    <PostArticle orientation={orientation} onClick={(e) => onClick(e, post.link)}>
      <ImageContainer>
        <Image src={post.widgetImage} />
      </ImageContainer>
      <PostInformation>
        <PostInformationHeader>{post.title}</PostInformationHeader>
        <PostInformationSubHeader>{post.subTitle}</PostInformationSubHeader>
        <PostInformationSubHeader>{post.date.toDateString()}</PostInformationSubHeader>
      </PostInformation>
    </PostArticle>
  );
};

export default withRouter(PostWidget);
