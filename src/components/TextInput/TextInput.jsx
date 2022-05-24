import React from "react";
import styled from "styled-components";

const TextInput = ({ label, placeholder, ...delageted }) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input {...delageted} placeholder={placeholder} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  color: var(--color-yellow-500);
`;

const Input = styled.input`
  border: none;
  background: transparent;
  border-bottom: 1px solid var(--color-gray-300);
  color: var(--color-white);

  &:focus-visible {
    border: none;
    outline: none;
    border-bottom: 1px solid var(--color-yellow-300);
  }
`;

export default TextInput;
