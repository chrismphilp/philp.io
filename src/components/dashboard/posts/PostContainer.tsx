import React, { Component, CSSProperties } from 'react';
import { Posts } from './Posts';
import { CardColumns } from 'react-bootstrap';
import { PostCollection } from '../../../assets/PostCollection';
import { Redirect } from 'react-router';

interface PostContainerProps {
  match: any;
}

interface PostContainerState {
  link: string;
  redirect: boolean;
}

export class PostContainer extends Component<PostContainerProps, PostContainerState> {

  constructor(props: any) {
    super(props);
    this.state = {
      link: '',
      redirect: false
    }
  }

  private handlePostSwitch(link: string): void {
    const currentRedirectState = this.state.redirect;
    this.setState({
      link: link,
      redirect: !currentRedirectState
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`${this.props.match.url.slice(0, -1)}${this.state.link}`}/>;
    }

    return (
      <CardColumns>
        {PostCollection.map((entry, key) => {
          return (
            <div onClick={() => this.handlePostSwitch(entry.link)}
                 style={styles.cardContainer}>
              <Posts entry={entry} match={this.props.match} key={key}/>
            </div>
          );
        })}
      </CardColumns>
    );
  }
}

const styles = {
  cardContainer: {
    cursor: 'pointer'
  }
};
