import React, { Component, CSSProperties } from 'react';
import moment from 'moment';

interface NavbarState {
  date: string;
}

export class Navbar extends Component<{}, NavbarState> {

  constructor(props: any) {
    super(props);
    this.state = {date: moment().format('MMMM Do YYYY, h:mm:ss a')};
    this.updateTime();
  }

  updateTime() {
    setInterval(
      () => this.setState({date: moment().format('MMMM Do YYYY, h:mm:ss a')}),
      1000
    );
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={styles.logo}>
          The Philpy Thought Shower
        </div>
        <div style={styles.time}>
          {this.state.date}
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    backgroundColor: 'black',
    height: 55,
    color: 'white'
  },
  logo: {
    float: 'left',
    paddingTop: 13.5,
    paddingLeft: 15
  } as CSSProperties,
  time: {
    float: 'right',
    paddingTop: 13.5,
    paddingRight: 15
  } as CSSProperties
};