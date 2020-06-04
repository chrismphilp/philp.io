import React, { FunctionComponent, useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Header = styled.header`
  left: 0;
  position: absolute;
  top: 0;
  background-color: #202222;
  color: #ffffff;
  cursor: default;
  height: 3.75em;
  line-height: 3.75em;
  width: 100%;
  z-index: 10000;
`;

const HomeLink = styled.h2`
  font-weight: 300;
  cursor: pointer;
  color: #ffffff;
  height: inherit;
  left: 2.5em;
  line-height: inherit;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
`;

const NavigationContainer = styled.nav`
  height: inherit;
  line-height: inherit;
  position: absolute;
  right: 2.75em;
  top: 0;
  vertical-align: middle;
`;

const NavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
`;

const NavigationItem = styled.li`
  margin-left: 0;
  border-radius: 4px;
  display: inline-block;
  margin-left: 2.75em;
  padding-left: 0;
`;

const NavigationLink = styled.a`
  transition: color 0.2s ease-in-out;
  color: #cee8d8;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
`;

const NavigationBar: FunctionComponent = () => {
  const [date, setDate] = useState<string>(moment().format('MMMM Do YYYY, h:mm:ss a'));

  useEffect(() => {
    setInterval(() => setDate(moment().format('MMMM Do YYYY, h:mm:ss a')), 1000);
  });

  return (
    <Header>
      <HomeLink>Home</HomeLink>
      <NavigationContainer>
        <NavigationList>
          <NavigationItem>
            <NavigationLink>About</NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink>{date}</NavigationLink>
          </NavigationItem>
        </NavigationList>
      </NavigationContainer>
    </Header>
  );
};

export default NavigationBar;
