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
          Hello <br /> Banana
        </Title>
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 670px;
  margin: 0 auto;
  height: 100%;
`;

const TextWrapper = styled.div`
  display: grid;
  place-content: center;
  height: 70vh; /* Adjust the height as needed */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
`;

export default Home;
