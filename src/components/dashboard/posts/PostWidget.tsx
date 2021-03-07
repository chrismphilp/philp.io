import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IPostCollection } from "../../../model/PostCollection.model";

type PostArticleStyleProps = {
  orientation: "left" | "right";
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
    flex-direction: ${(props: PostArticleStyleProps) => (props.orientation === "left" ? "row" : "row-reverse")};
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

type PostWidgetProps = {
  post: IPostCollection;
  orientation: "left" | "right";
};

const PostWidget: FunctionComponent<PostWidgetProps & RouteComponentProps> = ({ post, orientation, history }) => {
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
