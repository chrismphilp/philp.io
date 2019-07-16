import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import Router from './components/router/Router';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter basename={'/'}>
        <Navbar/>
        <Router/>
      </BrowserRouter>
      <Footer/>
    </div>
  );
};

export default App;
