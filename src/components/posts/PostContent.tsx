import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

interface PostContentProps {
  showContent: boolean;
}

export default class PostContent extends Component<PostContentProps, {}> {
  render() {
    return (
      <Card
        style={this.props.showContent ? {...styles.contentContainer, ...styles.contentBorder} :
          {...styles.contentHidden, ...styles.contentBorder}}>
        <Card.Header as="h5" style={{backgroundColor: 'white'}}>The importance of state</Card.Header>
      </Card>
    );
  }
}

const styles = {
  contentHidden: {
    height: 0,
    overflow: 'hidden'
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    height: 350,
    overflow: 'show'
  },
  contentBorder: {
    borderLeft: 5,
    borderRight: 5,
    borderBottom: 5,
    borderTop: 0,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderStyle: 'solid'
  }
};