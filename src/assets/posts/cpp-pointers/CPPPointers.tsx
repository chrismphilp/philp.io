import React, { FunctionComponent, useEffect } from 'react';
import content from './CPPPointers.data';
import SubjectPage from '../../../components/subject-page/SubjectPage';
import Prism from 'prismjs';

const CPPPointers: FunctionComponent = () => {
  useEffect(() => Prism.highlightAll(), []);

  return (
    <SubjectPage post={content} sidebarPresent={false}>
      <h2>Introduction</h2>

      <p>
        C and C++ unlike a lot of other languages provide the ability to directly interact with hardware memory -
        normally described as a low-level language.
      </p>
    </SubjectPage>
  );
};

export default CPPPointers;
