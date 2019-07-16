import React from 'react';
import { Route, Switch } from 'react-router';
import { PostContainer } from '../posts/PostContainer';
import About from '../about/About';
import CloudFormation from '../../assets/cloud-formation/CloudFormation';
import TattooRemoval from '../../assets/tattoo-removal/TattooRemoval';

const Router = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={PostContainer}/>
        <Route path='/about' component={About}/>
        <Route path='/tattoo-removal' component={TattooRemoval}/>
        <Route path='/cloud-theory' component={CloudFormation}/>
      </Switch>
    </main>
  );
};

export default Router;