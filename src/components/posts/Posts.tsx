import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import ExpandedPost from './ExpandedPost';

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
      <Card style={styles.cardRoot}>
        <Card.Header style={styles.cardHeader}>
          <Card.Img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"/>
        </Card.Header>
        <Card.Body style={styles.cardBody}>
          <Card.Title style={styles.cardBodyHeader}>React State Vs. Props</Card.Title>
          <Card.Text>
            By <a href='#top'>Christopher Philp</a>.
          </Card.Text>
        </Card.Body>
        <ExpandedPost showFullPost={this.state.showFullPost}
                      postSwitch={() => this.handlePostSwitch()}/>
      </Card>
    );
  }
}

const styles = {
  cardRoot: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    cursor: 'pointer'
  } as React.CSSProperties,
  cardHeader: {
    flex: 1
  },
  cardBody: {
    flex: 3,
  },
  cardBodyHeader: {
    fontSize: 50,
  }
};