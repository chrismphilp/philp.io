import React, { Component } from 'react';

interface PostContentProps {
  showContent: boolean;
}

export default class PostContent extends Component<PostContentProps, {}> {
  render() {
    return (
      <div style={this.props.showContent ? styles.contentContainer : styles.contentHidden}>
        <h1>Test</h1>
      </div>
    );
  }
}

const styles = {
  contentHidden: {
    height: 0,
    overflow: 'hidden',
    borderLeft: 5,
    borderRight: 5,
    borderBottom: 5,
    borderTop: 'none',
    borderWidth: 1,
    borderColor: 'e6e6e6',
    borderStyle: 'solid',
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    height: 350,
    borderLeft: 5,
    borderRight: 5,
    borderBottom: 5,
    borderTop: 0,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderStyle: 'solid',
    overflow: 'show'
  }
};