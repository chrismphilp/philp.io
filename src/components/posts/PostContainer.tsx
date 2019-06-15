import React, { Component } from 'react';
import { Posts } from './Posts';
import { Container, Row } from 'react-bootstrap';

export class PostContainer extends Component {
  render() {
    return (
      <Container style={{paddingTop: '25px'}}>
        <Row>
          <Posts/>
        </Row>
      </Container>
    );
  }
}