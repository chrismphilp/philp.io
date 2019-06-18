import React, { Component } from 'react';
import ExpandedPost from './expanded/ExpandedPost';

interface PostsState {
  showFullPost: boolean;
}

export class Posts extends Component<{}, PostsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showFullPost: false
    }
  }

  handlePostSwitch(): void {
    const currentPostState = this.state.showFullPost;
    this.setState({showFullPost: !currentPostState});
  }

  render() {
    return (
      <div onClick={() => this.handlePostSwitch()}>
        <div style={styles.cardRoot}>
          <div style={styles.cardHeader}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
              alt=""
              style={styles.image}/>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.cardBodyFiller}/>
            <div style={styles.cardBodyHeader}>React State Vs. Props</div>
            <div style={styles.cardBodyFiller}/>
          </div>
        </div>
        <ExpandedPost showFullPost={this.state.showFullPost}
                      postSwitch={() => this.handlePostSwitch()}/>
      </div>
    );
  }
}

const styles = {
  cardRoot: {
    flexDirection: 'row',
    display: 'flex',
    cursor: 'pointer'
  } as React.CSSProperties,
  cardHeader: {
    flex: 1,
    backgroundColor: '#e6e6e6'
  },
  image: {
    maxWidth: '100%'
  },
  cardBody: {
    display: 'flex',
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#f0f0f0'
  } as React.CSSProperties,
  cardBodyHeader: {
    flex: 2,
    fontSize: 50,
    paddingLeft: 15
  },
  cardBodyFiller: {
    flex: 1
  }
};