import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const NumberButton = styled.li`
  color: ${'#666'};
  list-style: none;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  display: inline-block;
  margin: 0 0.325em;
`;

type NumberButtonLinkStyleProps = {
  selected: boolean;
};

const NumberButtonLink = styled.a`
  list-style: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font: inherit;
  vertical-align: baseline;
  text-decoration: none;
  transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out, background 0.2s ease-in-out;
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: 700;
  letter-spacing: 0.125em;
  line-height: 3em;
  width: 3em;
  text-align: center;
  border-radius: 4px;
  background: ${'#fff'};
  border: solid 2px ${'#fff'};
  color: ${(props: NumberButtonLinkStyleProps) => (props.selected ? '#ff6098' : '#000000')};
  border-color: ${(props: NumberButtonLinkStyleProps) => (props.selected ? '#ff6098' : '')};

  ${NumberButton}:hover & {
    color: ${'#5fcec0'};
    border-color: ${'#5fcec0'};
  }
`;

type PageNumberButtonProps = {
  setCurrentPage: (value: number) => void;
  buttonValue: number;
  currentPage: number;
};

const PageNumberButton: FunctionComponent<PageNumberButtonProps> = ({ setCurrentPage, buttonValue, currentPage }) => {
  const selected: boolean = buttonValue === currentPage;

  return (
    <NumberButton onClick={() => setCurrentPage(buttonValue)}>
      <NumberButtonLink selected={selected}>{buttonValue}</NumberButtonLink>
    </NumberButton>
  );
};

export default PageNumberButton;