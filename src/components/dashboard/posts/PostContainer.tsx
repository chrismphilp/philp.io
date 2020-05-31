import React, { FunctionComponent } from 'react';
import { IPostCollection } from '../../../assets/PostCollection';
import styled from 'styled-components';
import StandardPost from './StandardPost';

const RowContainer = styled.div`
    display: flex;
  `,
  Content = styled.div`
    flex: 7;
    padding: 25px 0 25px 0;
  `,
  Padding = styled.div`
    flex: 1;
  `;

type PostContainerProps = {
  posts: IPostCollection[];
};

const PostContainer: FunctionComponent<PostContainerProps> = ({ posts }) => (
  <>
    {posts.map((post, key) => (
      <RowContainer key={key}>
        <Padding />
        <Content>
          {key % 2 === 0 ? (
            <StandardPost post={post} orientation={'left'} />
          ) : (
            <StandardPost post={post} orientation={'right'} />
          )}
        </Content>
        <Padding />
      </RowContainer>
    ))}
    ;
  </>
);

export default PostContainer;
