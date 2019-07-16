import React, { Component, CSSProperties } from 'react';
import { Posts } from './Posts';
import { Container, Row } from 'react-bootstrap';
import { PostCollection } from '../../assets/PostCollection';
import { Redirect } from 'react-router';

interface PostContainerProps {
  match: any;
}

interface PostContainerState {
  redirect: boolean;
  url: string;
}

export class PostContainer extends Component<PostContainerProps, PostContainerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: false,
      url: '/'
    };
  }


  redirectToLink(url: string) {
    this.setState({redirect: true, url: url});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`${this.props.match.url.slice(0, -1)}${this.state.url}`}/>;
    }

    return (
      <Container style={styles.container}>
        <Row>
          {PostCollection.map((entry, key) => {
            return (
              <div onClick={() => this.redirectToLink(entry.link)} key={key}>
                <Posts entry={entry}/>
              </div>
            );
          })}
        </Row>
      </Container>
    );
  }
}

const styles = {
  container: {
    paddingTop: 25,
    paddingBottom: 25
  } as CSSProperties
};