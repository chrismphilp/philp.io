import React from 'react';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { PostContainer } from './components/posts/PostContainer';

const App: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <PostContainer/>
      <Footer/>
    </div>
  );
};

export default App;
