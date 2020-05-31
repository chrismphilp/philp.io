import React, { FunctionComponent, useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

const NavigationBar: FunctionComponent = () => {
  const [date, setDate] = useState<string>(moment().format('MMMM Do YYYY, h:mm:ss a'));

  useEffect(() => {
    setInterval(() => setDate(moment().format('MMMM Do YYYY, h:mm:ss a')), 1000);
  });

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Link to="/">
        <Navbar.Brand>Philpy Thought Shower</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link to="/about">
            <Nav.Item>About Me</Nav.Item>
          </Link>
        </Nav>
        <Nav>
          <Nav.Item style={{ color: 'white' }}>{date}</Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
