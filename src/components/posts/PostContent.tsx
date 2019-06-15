import React, { Component } from 'react';

export default class PostContent extends Component {
  render() {
    return (
      <div style={styles.contentContainer}>
        <h1>Test</h1>
      </div>
    );
  }
}

const styles = {
  contentContainer: {
    backgroundColor: 'black',
    height: 250
  }
};