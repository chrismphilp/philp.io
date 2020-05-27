import React, { FunctionComponent, useState } from 'react';
import { Container } from 'react-bootstrap';
import PostContainer from './posts/PostContainer';
import Banner from './header/Banner';
import { IPostCollection, PostCollection } from '../../assets/PostCollection';

const Dashboard: FunctionComponent = () => {
  const [posts] = useState<IPostCollection[]>(PostCollection);
  const [filteredPosts, setFilteredPosts] = useState<IPostCollection[]>(PostCollection);

  const updateData = (data: IPostCollection[]): void => setFilteredPosts(data);

  return (
    <Container style={styles.container}>
      <div style={styles.filter}>
        <Banner updateData={updateData} posts={posts} />
      </div>
      <div style={styles.posts}>
        <PostContainer posts={filteredPosts} />
      </div>
    </Container>
  );
};

const styles = {
  container: {
    display: 'flex',
    paddingTop: 25,
    paddingBottom: 25,
  },
  filter: {
    flex: 2,
  },
  posts: {
    flex: 4,
  },
};

export default Dashboard;
