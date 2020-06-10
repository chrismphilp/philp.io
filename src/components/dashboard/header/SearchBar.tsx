import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    height: 35px;
    justify-content: center;
    align-items: center;
  `,
  SearchBarForm = styled.form`
    display: flex;
    width: 425px;
    height: 100%;
    border-right: none;
    border-radius: 0 2px 2px 0;
  `,
  SearchBarFormTextBox = styled.input`
    height: 100%;
    width: 350px;
    background-color: ${'#FFF'};
    box-shadow: inset 0 1px 2px ${'#eee'};
    border: 1px solid ${'#ccc'};

    :focus {
      outline: 0;
    }
  `,
  SearchButtonContainer = styled.button`
    cursor: pointer;
    line-height: 0;
    width: 65px;
    height: 110%;
    padding-left: 19.5px;
    border: 1px solid ${'#d3d3d3'};
    background-color: ${'#f8f8f8'};
    border-radius: 0 2px 2px 0;
    margin: 0;

    :focus {
      outline: 0;
    }
  `,
  SearchIconContainer = styled.div`
    width: 20px;
    height: 20px;
    color: ${'#333'};
    opacity: 0.6;
  `,
  SearchButtonIcon: FunctionComponent = () => (
    <SearchIconContainer>
      <svg viewBox="0 0 24 24" focusable="false" style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
        <g className="style-scope yt-icon">
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            className="style-scope yt-icon"
          ></path>
        </g>
      </svg>
    </SearchIconContainer>
  );

type SearchBarProps = {
  onSearch: (searchText: string) => void;
};

const SearchBar: FunctionComponent<SearchBarProps> = ({ onSearch }) => {
  const [timer, setTimer] = useState<number>(),
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value: string = event.target.value;
      // Clears running timer and starts a new one each time the user types
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          onSearch(value);
        }, 1000),
      );
    };

  return (
    <Wrapper>
      <SearchBarForm>
        <SearchBarFormTextBox onChange={handleChange} />
        <SearchButtonContainer>
          <SearchButtonIcon />
        </SearchButtonContainer>
      </SearchBarForm>
    </Wrapper>
  );
};

export default SearchBar;
