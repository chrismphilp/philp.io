import React, { FunctionComponent, useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import moment from 'moment';

const NavigationBar: FunctionComponent = () => {
  const [date, setDate] = useState<string>(moment().format('MMMM Do YYYY, h:mm:ss a'));

  useEffect(() => {
    setInterval(() => setDate(moment().format('MMMM Do YYYY, h:mm:ss a')), 1000);
  });

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Brand href="/">Philpy Thought Shower</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="about">About Me</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item style={{ color: 'white' }}>{date}</Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
