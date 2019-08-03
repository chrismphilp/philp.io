import React, { Component, CSSProperties } from 'react';
import { Container } from 'react-bootstrap';
import { PostContainer } from './posts/PostContainer';
import Banner from './header/banner/Banner';

interface DashboardProps {
  match: any;
}

export default class Dashboard extends Component<DashboardProps, {}> {
  render() {
    return (
      <Container style={styles.container}>
        <Banner/>
        <PostContainer match={this.props.match}/>
      </Container>
    );
  }
}

const styles = {
  container: {
    paddingTop: 25,
    paddingBottom: 25
  } as CSSProperties
};