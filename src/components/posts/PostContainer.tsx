import React, { Component, CSSProperties } from 'react';
import { Posts } from './Posts';
import { Container, Row } from 'react-bootstrap';

export class PostContainer extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Row>
          <Posts/>
        </Row>
      </Container>
    );
  }
}

const styles = {
  container: {
    paddingTop: '25px',
    paddingBottom: '25px',
  } as CSSProperties
};