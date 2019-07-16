import React, { Component, CSSProperties } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
        <Link to={'/'} style={styles.logo}>Philpy Thought Shower</Link>
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
    paddingLeft: 15,
    textDecoration: 'none',
    color: 'white'
  } as CSSProperties,
  time: {
    float: 'right',
    paddingTop: 13.5,
    paddingRight: 15
  } as CSSProperties
};