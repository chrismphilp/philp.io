import React, { Component, CSSProperties } from 'react';
import { Posts } from './Posts';
import { Container, Row } from 'react-bootstrap';
import { PostCollection } from '../../assets/PostCollection';

export class PostContainer extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Row>
          {PostCollection.map((entry, key) => {
            return (
              <Posts entry={entry} key={key}/>
            );
          })}
        </Row>
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