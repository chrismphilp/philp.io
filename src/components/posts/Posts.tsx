import React, { Component, CSSProperties } from 'react';
import ExpandedPost from './expanded/ExpandedPost';
import { IPostCollection } from '../../assets/PostCollection';

interface PostsProps {
  entry: IPostCollection;
}

interface PostsState {
  showFullPost: boolean;
}

export class Posts extends Component<PostsProps, PostsState> {
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
              src={this.props.entry.widgetImage}
              alt={this.props.entry.widgetImageAlt}
              style={styles.image}/>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.cardBodyFiller}/>
            <div style={styles.cardBodyHeader}>
              {this.props.entry.title}
            </div>
            <div style={styles.cardBodyFiller}/>
          </div>
        </div>
        <ExpandedPost showFullPost={this.state.showFullPost}
                      postSwitch={() => this.handlePostSwitch()}
                      subTitle={this.props.entry.subTitle}
                      contentKey={this.props.entry.contentKey}/>
      </div>
    );
  }
}

const styles = {
  cardRoot: {
    flexDirection: 'row',
    display: 'flex',
    cursor: 'pointer',
    paddingTop: 15
  } as CSSProperties,
  cardHeader: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  image: {
    maxWidth: '100%'
  },
  cardBody: {
    display: 'flex',
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#f0f0f0'
  } as CSSProperties,
  cardBodyHeader: {
    flex: 2,
    fontSize: 50,
    paddingLeft: 15,
    fontFamily: 'Open Sans'
  },
  cardBodyFiller: {
    flex: 1
  }
};