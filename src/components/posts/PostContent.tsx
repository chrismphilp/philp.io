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
    overflow: 'hidden'
  },
  contentContainer: {
    backgroundColor: 'black',
    height: 350,
    overflow: 'show'
  }
};