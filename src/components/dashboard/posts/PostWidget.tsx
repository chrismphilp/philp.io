import React, { FunctionComponent } from 'react';
import { IPostCollection } from '../../../assets/posts/PostCollection';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const PostSection = styled.section`
    display: flex;
    padding: 6em 0 2em 0;
    background-color: #eee;
    color: #777;
    width: 100%;
    margin: 0 auto;
  `,
  PostSectionInner = styled.div`
    color: #777;
    box-sizing: border-box;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    margin: 0 auto;
    width: 70em;
  `;

type PostArticleProps = {
  orientation: 'left' | 'right';
};

const PostArticle = styled.article`
    color: #777;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: flex;
    align-items: center;
    margin-bottom: 3em;
    flex-direction: ${(props: PostArticleProps) => (props.orientation === 'left' ? 'row' : 'row-reverse')};
    background-color: #fff;
  `,
  ImageContainer = styled.span`
    width: 48%;
    margin: 0 auto;
  `,
  Image = styled.img`
    max-width: 100%;
    border-radius: 0;
    display: block;
  `,
  PostInformation = styled.div`
    width: 52%;
    color: #777;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    padding: 2em 3em 0.1em 3em;
  `,
  PostInformationHeader = styled.h2`
    color: #555;
    font-size: 1.5em;
    line-height: 1.5em;
  `,
  PostInformationSubHeader = styled.p`
    margin: 0 0 2em 0;
  `;

type PostContainerProps = {
  posts: IPostCollection[];
};

const PostWidget: FunctionComponent<PostContainerProps & RouteComponentProps> = ({ posts, history }) => {
  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, link: string) => {
    event.preventDefault();
    history.push(link);
  };

  return (
    <PostSection>
      <PostSectionInner>
        {posts.map((post: IPostCollection, key: number) => (
          <PostArticle key={key} orientation={key % 2 === 0 ? 'left' : 'right'} onClick={(e) => onClick(e, post.link)}>
            <ImageContainer>
              <Image src={post.widgetImage}></Image>
            </ImageContainer>
            <PostInformation>
              <PostInformationHeader>{post.title}</PostInformationHeader>
              <PostInformationSubHeader>{post.subTitle}</PostInformationSubHeader>
              <PostInformationSubHeader>{post.date}</PostInformationSubHeader>
            </PostInformation>
          </PostArticle>
        ))}
        ;
      </PostSectionInner>
    </PostSection>
  );
};

export default withRouter(PostWidget);
