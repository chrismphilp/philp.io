import React, { FunctionComponent } from 'react';
import content from './Caffeine.data';
import SubjectPage from '../../../../components/subject-page/SubjectPage';

const Caffeine: FunctionComponent = () => {
  return (
    <SubjectPage post={content}>
      <p></p>
    </SubjectPage>
  );
};

export default Caffeine;
