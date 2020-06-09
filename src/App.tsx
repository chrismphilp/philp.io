import React, { FunctionComponent } from 'react';
import { HashRouter } from 'react-router-dom';
import NavigationBar from './components/navbar/NavigationBar';
import Footer from './components/footer/Footer';
import { Route } from 'react-router';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/about/About';
import TattooRemoval from './assets/posts/tattoo-removal/TattooRemoval';
import CloudFormation from './assets/posts/cloud-formation/CloudFormation';
import InfiniteMadness from './assets/posts/infinite-madness/InfiniteMadness';
import GoogleSearch from './assets/posts/google-search/GoogleSearch';
import TypeScript37 from './assets/posts/typescript3.7/TypeScript3.7';
import OriginOfSayings from './assets/posts/origin-of-sayings/OriginOfSayings';
import styled from 'styled-components';

const AppRoot = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
  `,
  App: FunctionComponent = () => (
    <AppRoot>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <NavigationBar />
        <Route exact path="/" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/tattoo-removal" component={TattooRemoval} />
        <Route path="/cloud-theory" component={CloudFormation} />
        <Route path="/infinite-madness" component={InfiniteMadness} />
        <Route path="/google-search" component={GoogleSearch} />
        <Route path="/typescript-3.7" component={TypeScript37} />
        <Route path="/origin-of-sayings" component={OriginOfSayings} />
      </HashRouter>
      <Footer />
    </AppRoot>
  );

export default App;
