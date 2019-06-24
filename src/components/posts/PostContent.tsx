import React, { Component, CSSProperties } from 'react';
import { Card } from 'react-bootstrap';
import TattooRemovalPost from '../../assets/tattoo-removal/TattooRemoval';

interface PostContentProps {
  showContent: boolean;
}

export default class PostContent extends Component<PostContentProps, {}> {
  render() {
    return (
      <Card
        style={this.props.showContent ? {...styles.contentContainer, ...styles.contentBorder} :
          {...styles.contentHidden, ...styles.contentBorder}}>
        <Card.Header as="h5" style={{backgroundColor: 'white'}}>How can 'permanent' ink be unwritten?</Card.Header>
        <Card.Body style={styles.postContent}>
          <TattooRemovalPost/>
        </Card.Body>
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
    height: 550,
    overflowY: 'scroll',
    overflow: 'show'
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