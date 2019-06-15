import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export class Posts extends Component {
  render() {
    return (
      <Card style={styles.cardRoot}>
          <Card.Header style={styles.cardHeader}>
            <Card.Img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"/>
          </Card.Header>
          <Card.Body style={styles.cardBody}>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
          </Card.Body>
      </Card>
    );
  }
}

const styles = {
  cardRoot: {
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap'
  },
  cardHeader: {
    flex: 1
  },
  cardBody: {
    flex: 3
  }
};