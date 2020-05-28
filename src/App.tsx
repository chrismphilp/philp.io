import React, { FunctionComponent } from 'react';
import { HashRouter } from 'react-router-dom';
import NavigationBar from './components/navbar/NavigationBar';
import Footer from './components/footer/Footer';
import { Route } from 'react-router';
import Dashboard from './components/dashboard/Dashboard';
import About from './components/about/About';
import TattooRemoval from './assets/tattoo-removal/TattooRemoval';
import CloudFormation from './assets/cloud-formation/CloudFormation';
import InfiniteMadness from './assets/infinite-madness/InfiniteMadness';

const App: FunctionComponent = () => {
  return (
    <div>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <NavigationBar/>
        <Route exact path="/" component={Dashboard}/>
        <Route path="/about" component={About}/>
        <Route path="/tattoo-removal" component={TattooRemoval} />
        <Route path="/cloud-theory" component={CloudFormation} />
        <Route path="/infinite-madness" component={InfiniteMadness} />
      </HashRouter>
      <Footer/>
    </div>
  );
};

export default App;
