import React, { FunctionComponent } from "react";
import styled from 'styled-components';
import { IAppState } from "../../../redux";
import { connect, ConnectedProps } from "react-redux";
import { updatePageNumber } from "../../../redux/page/page.action";
import { bindActionCreators, Dispatch } from "redux";

type NavigationButtonStyleProps = {
  disabled: boolean;
};

const NavigationButton = styled.li`
    color: ${'#666'};
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
    box-shadow: 0 0 0 2px ${(props: NavigationButtonStyleProps) => (props.disabled ? '#c6c6c6' : '#5fcec0')};
    width: 10em;
    padding: 0;

    ${NavigationButton}: hover & {
      background: ${(props: NavigationButtonStyleProps) => (props.disabled ? '#c6c6c6' : '#3bbfaf')};
    }
  `;

type PageNavigationButtonProps = {
  buttonText: string;
  disabled: boolean;
  navigationDirection: 'down' | 'up';
};

const PageNavigationButton: FunctionComponent<PageNavigationButtonProps & ConnectedProps<typeof connector>> = ({
  updatePage,
  buttonText,
  disabled,
  navigationDirection,
  page
}) => {
  const onClick = () => {
    if (disabled) return;
    updatePage(navigationDirection === 'up' ? page + 1 : page - 1);
  };

  return (
    <NavigationButton onClick={onClick} disabled={disabled}>
      <NavigationButtonSpan disabled={disabled}>{buttonText}</NavigationButtonSpan>
    </NavigationButton>
  );
};

const mapStateToProps = (state: IAppState): {
  page: number
} => ({
  page: state.pageReducer.pageNumber
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  updatePage: updatePageNumber
}, dispatch);

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(PageNavigationButton);
