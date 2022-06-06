import React from "react";
import styled from "styled-components";

const Checkbox = ({ name, label, value = false, handleCheck, ...props }) => {
  const [checked, setChecked] = React.useState(value);

  const handleOnChange = () => {
    const checkValue = !checked;
    setChecked(checkValue);
    handleCheck({ name, checked: checkValue });
  };

  return (
    <Label name={name} {...props}>
      <input
        type="checkbox"
        value={checked}
        checked={checked}
        onChange={handleOnChange}
      />
      {label}
    </Label>
  );
};

const Label = styled.label`
  color: black;
  font-size: 1.1rem;
  padding: 8px 0px;
  border-radius: 4px;

  &:hover {
    background: var(--color-gray-300);
  }

  & input {
    margin-right: 6px;
  }
`;

export default Checkbox;
