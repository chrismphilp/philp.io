import React, { FunctionComponent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { updateDashboardSearchValue } from '../../../src/redux/dashboard/dashboard.action';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../../src/redux';
import { MdClear } from 'react-icons/all';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 35px;
  justify-content: center;
  align-items: center;
`;
const SearchBarForm = styled.form`
  display: flex;
  width: 425px;
  height: 100%;
  border-right: none;
  border-radius: 0 2px 2px 0;
  opacity: 0.8;
`;
const SearchBarFormTextBox = styled.input`
  height: 100%;
  width: 350px;
  background-color: ${'#FFF'};
  box-shadow: inset 0 1px 2px ${'#eee'};
  border: 1px solid ${'#ccc'};

  :focus {
    outline: 0;
  }
`;
const ButtonContainer = styled.div`
  cursor: pointer;
  line-height: 0;
  width: 65px;
  height: 37.75px;
  padding-left: 19.5px;
  background-color: ${'#f8f8f8'};
  border-radius: 0 2px 2px 0;
  margin: 0;
`;
const ButtonIconContainer = styled.div`
  width: 20px;
  height: 20px;
  color: ${'#333'};
  opacity: 0.6;
  border-left: 5px;
`;
const DeleteButtonIcon: FunctionComponent = () => (
  <ButtonIconContainer>
    <MdClear size={15} style={{ paddingTop: 12.5, paddingLeft: 12.5 }} />
  </ButtonIconContainer>
);

const SearchBar: FunctionComponent<ConnectedProps<typeof connector>> = ({
  updateDashboardSearch,
  searchValue,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value: string = event.target.value;
    updateDashboardSearch(value.toLowerCase());
  };

  const onDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    updateDashboardSearch('');
  };

  return (
    <Wrapper>
      <SearchBarForm>
        <SearchBarFormTextBox value={searchValue} onChange={handleChange} />
        <ButtonContainer onClick={onDelete}>
          <DeleteButtonIcon />
        </ButtonContainer>
      </SearchBarForm>
    </Wrapper>
  );
};

const mapStateToProps = (
  state: IAppState,
): {
  searchValue: string;
} => ({
  searchValue: state.dashboardReducer.searchValue,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      updateDashboardSearch: updateDashboardSearchValue,
    },
    dispatch,
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SearchBar);
