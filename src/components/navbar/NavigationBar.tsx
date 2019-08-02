import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import moment from 'moment';

interface NavbarState {
  date: string;
}

export class NavigationBar extends Component<{}, NavbarState> {

  constructor(props: any) {
    super(props);
    this.state = {date: moment().format('MMMM Do YYYY, h:mm:ss a')};
    this.updateTime();
  }

  private updateTime(): void {
    setInterval(
      () => this.setState({date: moment().format('MMMM Do YYYY, h:mm:ss a')}),
      1000
    );
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="/">Philpy Thought Shower</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="about">About Me</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item style={{color: 'white'}}>{this.state.date}</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
