import React, { FunctionComponent } from 'react';
import PostWidget from './PostWidget';
import PageSelector from '../page-selector/PageSelector';
import styled from 'styled-components';
import { IPostCollection } from '../../../model/PostCollection.model';
import { IAppState } from '../../../redux';
import { connect, ConnectedProps } from 'react-redux';

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

const PostContainer: FunctionComponent<PostContainerProps & ConnectedProps<typeof connector>> = ({ posts, page }) => {
    return (
      <PostWrapper>
        <PostSection>
          <PostSectionInner>
            {posts[page - 1]?.map((post: IPostCollection, key: number) => (
              <PostWidget key={key} post={post} orientation={key % 2 === 0 ? 'left' : 'right'} />
            ))}
          </PostSectionInner>
        </PostSection>
        <PageSelector numberOfPages={posts.length} />
      </PostWrapper>
    );
  },
  mapStateToProps = (
    state: IAppState,
  ): {
    page: number;
  } => ({
    page: state.dashboardReducer.pageNumber,
  }),
  connector = connect(mapStateToProps);

export default connector(PostContainer);
