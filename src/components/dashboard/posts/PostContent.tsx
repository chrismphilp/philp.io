import React, { Component, CSSProperties, ReactElement } from 'react';
import { Card } from 'react-bootstrap';

interface PostContentProps {
  subTitle: string;
  children: ReactElement;
}

export default class PostContent extends Component<PostContentProps, {}> {
  render() {
    return (
      <Card style={styles.contentContainer}>
        <Card.Header as="h5">{this.props.subTitle}</Card.Header>
        <Card.Body style={styles.postContent}>{this.props.children}</Card.Body>
      </Card>
    );
  }
}

const styles = {
  contentContainer: {
    backgroundColor: '#ffffff'
  } as CSSProperties,
  contentBorder: {
    borderLeft: 5,
    borderRight: 5,
    borderBottom: 5,
    borderTop: 0,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderStyle: 'solid'
  },
  postContent: {
    fontFamily: 'Source Sans Pro',
    textAlign: 'justify'
  } as CSSProperties
};