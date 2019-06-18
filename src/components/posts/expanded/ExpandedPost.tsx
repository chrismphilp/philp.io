import React, { Component } from 'react';
import PostContent from '../PostContent';
import { CSSTransition } from 'react-transition-group';
import './ExpandedPost.css';

interface ExpandedPostProps {
  showFullPost: boolean;
  postSwitch: () => void;
}

interface ExpandedPostState {
  showContent: boolean;
}

export default class ExpandedPost extends Component<ExpandedPostProps, ExpandedPostState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showContent: false
    }
  }

  handleAnimationFinished(): void {
    const showContent = this.state.showContent;
    this.setState({showContent: !showContent});
  }

  render() {
    return (
      <CSSTransition classNames="example"
                     timeout={{enter: 500, exit: 300}}
                     in={this.props.showFullPost}
                     unmountOnExit
                     onEntering={() => this.handleAnimationFinished()}
                     onExiting={() => this.handleAnimationFinished()}>
        <PostContent showContent={this.state.showContent}/>
      </CSSTransition>
    );
  }
}

// const styles = {
//   unexpandedPost: {
//     height: 50
//   },
//   expandedPost: {
//     height: 500
//   }
// };