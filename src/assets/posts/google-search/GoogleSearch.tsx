import React, { FunctionComponent } from 'react';
import content from './GoogleSearch.data';
import SubjectPage from '../../../components/subject-page/SubjectPage';

const GoogleSearch: FunctionComponent = () => {
  return (
    <SubjectPage post={content}>
      <p></p>
    </SubjectPage>
  );
};

export default GoogleSearch;
