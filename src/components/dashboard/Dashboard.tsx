import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PostContainer from './posts/PostContainer';
import Banner from './header/banner/Banner';
import { IPostCollection, PostCollection } from '../../assets/PostCollection';

type DashboardState = {
  posts: IPostCollection[];
};

export default class Dashboard extends Component<{}, DashboardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: PostCollection
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Banner posts={this.state.posts}/>
        <PostContainer posts={this.state.posts}/>
      </Container>
    );
  }
};

const styles = {
  container: {
    paddingTop: 25,
    paddingBottom: 25
  }
};
