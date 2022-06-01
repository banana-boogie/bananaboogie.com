import React from "react";
import styled, { keyframes } from "styled-components";
import Icon from "@components/Icon";

const Loading = () => {
  return <LoadingIcon id="loader" color="white" />;
};

const rotate = keyframes`
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
`;

const LoadingIcon = styled(Icon)`
  display: grid;
  place-content: center;

  & > svg {
    animation: ${rotate} 2000ms infinite linear;
  }
`;

export default Loading;
