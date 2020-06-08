import React, { FunctionComponent } from 'react';
import SubjectPage from '../../../components/subject-page/SubjectPage';
import content from './GoogleSearch.data';

const GoogleSearch: FunctionComponent = () => {
  return (
    <SubjectPage post={content}>
      <p></p>
    </SubjectPage>
  );
};

export default GoogleSearch;
