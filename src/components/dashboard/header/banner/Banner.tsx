import { Container, Jumbotron } from 'react-bootstrap';
import React from 'react';

const Banner = () => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Welcome to the Philpy Thought Shower</h1>
        <p>
          This is a modified jumbotron that occupies the entire horizontal space of
          its parent.
        </p>
      </Container>
    </Jumbotron>
  );
};

export default Banner;