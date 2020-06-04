import React, { FunctionComponent } from 'react';
import SubjectPageBanner from '../../../components/subject-page/SubjectPageBanner';
import content from './InfiniteMadness.data';

const InfiniteMadness: FunctionComponent = () => {
  return (
    <SubjectPageBanner post={content}>
      <div />
    </SubjectPageBanner>
  );
};

export default InfiniteMadness;
