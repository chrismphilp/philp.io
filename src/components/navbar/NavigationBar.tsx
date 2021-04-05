import React, { FunctionComponent, useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const Header = styled.header`
  left: 0;
  position: absolute;
  top: 0;
  background-color: #ffffff;
  color: #202222;
  cursor: default;
  height: 3.75em;
  line-height: 3.75em;
  width: 100%;
  z-index: 10000;
`;
const HomeLink = styled.h2`
  font-weight: 300;
  cursor: pointer;
  color: #202222;
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
  color: #202222;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
`;

const NavigationBar: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [date, setDate] = useState<string>(moment().format('MMMM Do YYYY, h:mm:ss a'));

  useEffect(() => {
    setInterval(() => setDate(moment().format('MMMM Do YYYY, h:mm:ss a')), 1000);
  });

  return (
    <Header>
      <HomeLink onClick={() => history.push('/')}>Home</HomeLink>
      <NavigationContainer>
        <NavigationList>
          <NavigationItem>
            <NavigationLink onClick={() => history.push('/about')}>About</NavigationLink>
          </NavigationItem>
          <NavigationItem>
            <NavigationLink
              onClick={() => window.open('https://en.wikipedia.org/wiki/Greenwich_Mean_Time')}>
              {date}
            </NavigationLink>
          </NavigationItem>
        </NavigationList>
      </NavigationContainer>
    </Header>
  );
};

export default withRouter(NavigationBar);
