import React, { FunctionComponent } from 'react';
import { HashRouter } from 'react-router-dom';
import NavigationBar from './components/navbar/NavigationBar';
import { Route } from 'react-router';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import TattooRemoval from './assets/posts/tattoo-removal/TattooRemoval';
import CloudFormation from './assets/posts/cloud-formation/CloudFormation';
import InfiniteMadness from './assets/posts/infinite-madness/InfiniteMadness';
import GoogleSearch from './assets/posts/google-search/GoogleSearch';
import TypeScript37 from './assets/posts/typescript3.7/TypeScript3.7';
import OriginOfSayingsPt1 from './assets/posts/origin-of-sayings/part-one/OriginOfSayings.pt1';
import OriginOfSayingsPt2 from './assets/posts/origin-of-sayings/part-two/OriginOfSayings.pt2';
import CPPPointers from './assets/posts/cpp-pointers/CPPPointers';
import styled from 'styled-components';
import HelicopterFlight from './assets/posts/helicopter-flight/HelicopterFlight';
import Caffeine from './assets/posts/caffeine/Caffeine';
import GitFunctionality from './assets/posts/git-functionality/GitFunctionality';

const AppRoot = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
  `,
  App: FunctionComponent = () => {
    return (
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
          <Route path="/origin-of-sayings-part-one" component={OriginOfSayingsPt1} />
          <Route path="/origin-of-sayings-part-two" component={OriginOfSayingsPt2} />
          <Route path="/cpp-pointers" component={CPPPointers} />
          <Route path="/helicopter-flight" component={HelicopterFlight} />
          <Route path="/caffeine" component={Caffeine} />
          <Route path="/git" component={GitFunctionality} />
        </HashRouter>
        <Footer />
      </AppRoot>
    );
  };

export default App;
