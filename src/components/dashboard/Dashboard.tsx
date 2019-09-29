import React, { FunctionComponent } from 'react';
import { Container } from 'react-bootstrap';
import PostContainer from './posts/PostContainer';
import Banner from './header/banner/Banner';

const Dashboard: FunctionComponent = () => {
  return (
    <Container style={styles.container}>
      <Banner/>
      <PostContainer/>
    </Container>
  );
};

const styles = {
  container: {
    paddingTop: 25,
    paddingBottom: 25
  }
};

export default Dashboard;