import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PostContent from './PostContent';

interface ExpandedPostProps {
  showFullPost: boolean;
  postSwitch: () => void;
}
export default class ExpandedPost extends Component<ExpandedPostProps, {}> {
  render() {
    return (
      <TransitionGroup>
      <CSSTransition in={this.props.showFullPost}
                     timeout={400}
                     classNames="list-transition"
                     unmountOnExit
                     appear
                     onEntered={this.props.postSwitch}
                     onExit={this.props.postSwitch}>
        <PostContent/>
      </CSSTransition>
      </TransitionGroup>
    );
  }
}

const styles = {};