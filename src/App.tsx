import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/navbar/NavigationBar";
import Footer from "./components/footer/Footer";
import Router from "./components/router/Router";

const App: FunctionComponent = () => {
  return (
    <div>
      <BrowserRouter basename={"/blog"}>
        <NavigationBar />
        <Router />
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
