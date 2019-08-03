import React, { Component, CSSProperties } from 'react';
import { IPostCollection } from '../../../assets/PostCollection';
import { Card } from 'react-bootstrap';

interface PostsProps {
  entry: IPostCollection;
  match: any;
}

export class Posts extends Component<PostsProps, {}> {

  render() {
    return (
      <Card style={styles.cardFont}>
        <Card.Img variant="top" src={this.props.entry.widgetImage}/>
        <Card.Header><h5>{this.props.entry.title}</h5></Card.Header>
        <Card.Body>
          <Card.Text>{this.props.entry.subTitle}</Card.Text>
          <footer className="blockquote-footer">
            <cite title="Date">{this.props.entry.date}</cite>
          </footer>
        </Card.Body>
      </Card>
    );
  }
}

const styles = {
  cardFont: {
    fontFamily: 'DM Serif Display'
  } as CSSProperties
};