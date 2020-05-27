import React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../dashboard/Dashboard";
import About from "../about/About";
import CloudFormation from "../../assets/cloud-formation/CloudFormation";
import TattooRemoval from "../../assets/tattoo-removal/TattooRemoval";
import InfiniteMadness from "../../assets/infinite-madness/InfiniteMadness";

const Router = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/tattoo-removal" component={TattooRemoval} />
        <Route path="/cloud-theory" component={CloudFormation} />
        <Route path="/infinite-madness" component={InfiniteMadness} />
      </Switch>
    </main>
  );
};

export default Router;
