import React, { FunctionComponent } from 'react';
import PageNavigationButton from './PageNavigationButton';
import PageNumberButton from './PageNumberButton';
import styled from 'styled-components';
import { IAppState } from "../../../redux";
import { bindActionCreators, Dispatch } from "redux";
import { updatePageNumber } from "../../../redux/dashboard/dashboard.action";
import { connect, ConnectedProps } from "react-redux";

const PageSelectorContainer = styled.ul`
  color: #666;
  box-sizing: border-box;
  padding: 0 0 45px 0;
  border: 0;
  vertical-align: baseline;
  list-style: none;
  cursor: default;
  margin: 0;
  text-align: center;
`;

type PageSelectorProps = {
  numberOfPages: number;
};

const PageSelector: FunctionComponent<PageSelectorProps & ConnectedProps<typeof connector>> =
  ({ numberOfPages, page }) => {
  return (
    <PageSelectorContainer>
      <PageNavigationButton
        disabled={page - 1 <= 0}
        buttonText={'Previous'}
        navigationDirection={'down'}
      />
      {[...Array(numberOfPages).keys()].map((value: number, key: number) => (
        <PageNumberButton key={key} buttonValue={value + 1} />
      ))}
      <PageNavigationButton
        disabled={page + 1 > numberOfPages}
        buttonText={'Next'}
        navigationDirection={'up'}
      />
    </PageSelectorContainer>
  );
};

const mapStateToProps = (state: IAppState): {
  page: number
} => ({
  page: state.dashboardReducer.pageNumber
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  updatePage: updatePageNumber
}, dispatch);

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(PageSelector);
