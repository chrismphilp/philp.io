import React, { FunctionComponent } from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import FilterContainer from "../filter/FilterContainer";
import { IPostCollection } from "../../../assets/PostCollection";

type BannerProps = {
  updateData: (data: IPostCollection[]) => void;
  posts: IPostCollection[];
};

const Banner: FunctionComponent<BannerProps> = ({ updateData, posts }) => {
  return (
    <Jumbotron fluid>
      <Container>
        <Row>
          <Col md={6} xs={12}>
            <h2>Informing new readers quickly and efficiently about what's most interesting in this post's contents</h2>
            <p>This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
          </Col>
          <Col md={6} xs={12}>
            <FilterContainer updateData={updateData} posts={posts} />
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Banner;
