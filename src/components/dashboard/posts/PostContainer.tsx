import React, { FunctionComponent, useState } from 'react';
import PostWidget from './PostWidget';
import PageSelector from '../page-selector/PageSelector';
import styled from 'styled-components';
import { IPostCollection } from '../../../model/PostCollection.model';

const PostWrapper = styled.div`
    background-color: #eee;
  `,
  PostSection = styled.section`
    display: flex;
    padding: 6em 0 2em 0;
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

type PostContainerProps = {
  posts: IPostCollection[][];
};

const PostContainer: FunctionComponent<PostContainerProps> = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <PostWrapper>
      <PostSection>
        <PostSectionInner>
          {posts[currentPage - 1]?.map((post: IPostCollection, key: number) => (
            <PostWidget key={key} post={post} orientation={key % 2 === 0 ? 'left' : 'right'} />
          ))}
        </PostSectionInner>
      </PostSection>
      <PageSelector numberOfPages={posts.length} />
    </PostWrapper>
  );
};

export default PostContainer;
