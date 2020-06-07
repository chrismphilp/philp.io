import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

type NavigationButtonStyleProps = {
  disabled: boolean;
};

const NavigationButton = styled.li`
    color: #666;
    list-style: none;
    cursor: ${(props: NavigationButtonStyleProps) => (props.disabled ? 'default' : 'pointer')};
    box-sizing: border-box;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    display: inline-block;
    margin: 0 0.325em;
  `,
  NavigationButtonSpan = styled.span`
    list-style: none;
    box-sizing: border-box;
    margin: 0;
    font: inherit;
    vertical-align: baseline;
    text-decoration: none;
    transition: color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
    -webkit-appearance: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 0.75em !important;
    font-weight: 700;
    letter-spacing: 0.125em;
    line-height: 3.75em;
    height: 3.75em;
    border: 0;
    border-radius: 4px;
    text-align: center;
    background: ${(props: NavigationButtonStyleProps) => (props.disabled ? '#c6c6c6' : '#5FCEC0')};
    color: #fff;
    box-shadow: 0 0 0 2px #5fcec0;
    width: 10em;
    padding: 0;
  `;

type PageNavigationButtonProps = {
  setCurrentPage: (value: number) => void;
  buttonText: string;
  disabled: boolean;
  navigationDirection: 'down' | 'up';
  currentPage: number;
};

const PageNavigationButton: FunctionComponent<PageNavigationButtonProps> = ({
  setCurrentPage,
  buttonText,
  disabled,
  navigationDirection,
  currentPage,
}) => {
  const onClick = () => {
    if (disabled) return;
    setCurrentPage(navigationDirection === 'up' ? currentPage + 1 : currentPage - 1);
  };

  return (
    <NavigationButton onClick={onClick} disabled={disabled}>
      <NavigationButtonSpan disabled={disabled}>{buttonText}</NavigationButtonSpan>
    </NavigationButton>
  );
};

export default PageNavigationButton;
