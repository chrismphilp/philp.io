import React, { Component } from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
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
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={styles.time}>
              The Philpy Thought Shower
            </Typography>
            <Typography variant="h6" color="inherit">
              {this.state.date}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1
  },
  time: {
    flex: 1
  }
};