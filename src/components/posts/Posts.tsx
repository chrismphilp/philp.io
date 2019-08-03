import React, { Component, CSSProperties } from 'react';
import { IPostCollection } from '../../assets/PostCollection';
import { Button, Card, CardColumns, CardGroup, Image } from "react-bootstrap";
import { Redirect } from "react-router";

interface PostsProps {
  entry: IPostCollection;
  match: any;
}

interface PostsState {
  showFullPost: boolean;
  redirect: boolean;
}

export class Posts extends Component<PostsProps, PostsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showFullPost: false,
      redirect: false
    }
  }

  private handlePostSwitch(): void {
    const currentPostState = this.state.showFullPost;
    this.setState({showFullPost: !currentPostState});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`${this.props.match.url.slice(0, -1)}${this.props.entry.link}`}/>;
    }

    return (
      <Card>
        <Card.Img variant="top" src={this.props.entry.widgetImage}/>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button onClick={() => this.handlePostSwitch()}
                  variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
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