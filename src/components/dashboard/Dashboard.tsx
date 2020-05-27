import React, { FunctionComponent, useState } from "react";
import { Container } from "react-bootstrap";
import PostContainer from "./posts/PostContainer";
import Banner from "./header/Banner";
import { IPostCollection, PostCollection } from "../../assets/PostCollection";

const Dashboard: FunctionComponent = () => {
  const [posts] = useState<IPostCollection[]>(PostCollection);
  const [filteredPosts, setFilteredPosts] = useState<IPostCollection[]>(PostCollection);

  const updateData = (data: IPostCollection[]): void => setFilteredPosts(data);

  return (
    <Container style={styles.container}>
      <Banner updateData={updateData} posts={posts} />
      <PostContainer posts={filteredPosts} />
    </Container>
  );
};

const styles = {
  container: {
    paddingTop: 25,
    paddingBottom: 25,
  },
};

export default Dashboard;
