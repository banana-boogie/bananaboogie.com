import React from "react";
import type { NextPage } from "next";
import styled from "styled-components";

import Header from "@/components/Header";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header />
      <TextWrapper>
        <Title>
          HELLO <br /> BANANA
        </Title>
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  height: 100%;
`;

const TextWrapper = styled.div`
  display: grid;
  place-content: center;
  height: 70vh; /* Adjust the height as needed */
`;

const Title = styled.h1`
  text-align: center;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-display);
  color: var(--color-title);
  line-height: 0.3;
`;

export default Home;
