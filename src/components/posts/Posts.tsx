import React, { Component, CSSProperties } from 'react';
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
      <div onClick={() => this.handlePostSwitch()}
           style={styles.cardRoot}>
        <div style={styles.cardTile}>
          <div style={styles.cardText}>
            <div style={styles.cardTitle}>
              {this.props.entry.title}
            </div>
            <div style={styles.cardDate}>
              <h6>Published date: {this.props.entry.date}</h6>
              <h6>Category: {this.props.entry.category}</h6>
            </div>
          </div>
          <div style={styles.cardImage}>
            <img
              src={this.props.entry.widgetImage}
              alt={this.props.entry.widgetImageAlt}
              style={styles.image}/>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  cardRoot: {
    paddingTop: 25
  },
  cardTile: {
    flexDirection: 'row',
    display: 'flex',
    cursor: 'pointer',
    borderStyle: 'outset',
    borderColor: 'black',
    borderWidth: 2.5,
    fontFamily: 'DM Serif Display'
  } as CSSProperties,
  cardText: {
    flexDirection: 'column',
    flex: 2
  } as CSSProperties,
  cardImage: {
    flex: 1,
    padding: 5,
    borderLeftStyle: 'solid',
    borderLeftColor: '#e6e6e6',
    borderLeftWidth: 1.5
  } as CSSProperties,
  image: {
    maxWidth: '100%',
    maxHeight: 250
  },
  cardTitle: {
    display: 'flex',
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontSize: 50
  } as CSSProperties,
  cardDate: {}
};