import React, { FunctionComponent } from 'react';
import content from './InfiniteMadness.data';
import SubjectPage from '../../../components/subject-page/SubjectPage';

const InfiniteMadness: FunctionComponent = () => {
  return (
    <SubjectPage post={content}>
      <div />
    </SubjectPage>
  );
};

export default InfiniteMadness;
