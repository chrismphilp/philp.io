import React, { FunctionComponent } from 'react';
import PageNavigationButton from './PageNavigationButton';
import PageNumberButton from './PageNumberButton';
import styled from 'styled-components';

const PageSelectorContainer = styled.ul`
  color: #666;
  box-sizing: border-box;
  padding: 0 0 45px 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  list-style: none;
  cursor: default;
  margin: 0;
  text-align: center;
`;

type PageSelectorProps = {
  setCurrentPage: (value: number) => void;
  numberOfPages: number;
  currentPage: number;
};

const PageSelector: FunctionComponent<PageSelectorProps> = ({ setCurrentPage, numberOfPages, currentPage }) => {
  return (
    <PageSelectorContainer>
      <PageNavigationButton
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        disabled={currentPage - 1 <= 0}
        buttonText={'Previous'}
        navigationDirection={'down'}
      />
      {[...Array(numberOfPages).keys()].map((value: number, key: number) => (
        <PageNumberButton key={key} setCurrentPage={setCurrentPage} currentPage={currentPage} buttonValue={value + 1} />
      ))}
      <PageNavigationButton
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        disabled={currentPage + 1 > numberOfPages}
        buttonText={'Next'}
        navigationDirection={'up'}
      />
    </PageSelectorContainer>
  );
};

export default PageSelector;
