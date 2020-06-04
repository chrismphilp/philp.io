import React, { FunctionComponent } from 'react';
import PostContent from '../../../components/subject-page/PostContent';
import content from './InfiniteMadness.data';

const InfiniteMadness: FunctionComponent = () => {
  return (
    <PostContent content={content}>
      <div />
    </PostContent>
  );
};

export default InfiniteMadness;
