import React from 'react';
import styled from 'styled-components';
import COLOURS from '../../enum/colours';

const SearchInput = styled.input`
  background-color: black;
  border: 1px solid;
  line-height: 1;
  height: 30px;
  padding: 10px;
  border-radius: 20px;
  font-weight: 800;
  border-color: ${COLOURS.MAIN_GOLD};
`;

interface Props {}

const SearchBar: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <SearchInput placeholder="Search..." type="text" name="search" />
    </React.Fragment>
  );
};

export default SearchBar;
