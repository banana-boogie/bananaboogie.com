import React from "react";
import styled from "styled-components";

import VisuallyHidden from "../VisuallyHidden";
import Icon from "../Icon";

const SearchInput = ({ label, placeholder, ...delegated }) => {
  return (
    <Label>
      <VisuallyHidden>Search</VisuallyHidden>
      <Input {...delegated} placeholder={placeholder} />
      <SearchIcon id="search" strokeWidth={1} size={24} color="white" />
    </Label>
  );
};

const Label = styled.label`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  padding-left: 32px;
  color: var(--color-gray-100);

  &::placeholder {
    color: var(--color-gray-500);
  }
`;

const SearchIcon = styled(Icon)`
  position: absolute;
  top: 0;
  left: 6px;
  bottom: 0;
  margin: auto;
  width: 24px;
  height: 24px;
  color: var(--color-gray-500);
`;

export default SearchInput;
