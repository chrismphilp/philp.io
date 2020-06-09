import React, { FunctionComponent } from 'react';
import SubjectPage from '../../../components/subject-page/SubjectPage';
import content from './OriginOfSayings.data';

const OriginOfSayings: FunctionComponent = () => {
  return (
    <SubjectPage post={content} sidebarPresent={false}>
      <p>The English language is full of nuanced sayings that are used everyday, whilst being rooted in history.</p>
    </SubjectPage>
  );
};

export default OriginOfSayings;
