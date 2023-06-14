import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

import Header from "@/components/Header";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header />
      <Main>
        <Title>
          HELLO <br /> BANANA
        </Title>
        <ImageContainer>
          <BananaImage
            src="/banana.svg"
            alt="picture of a digitally drawn banana"
          />
        </ImageContainer>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  height: 100%;
  max-width: 1200px;
`;

const Main = styled.main`
  display: grid;
  place-content: center;
  position: relative;
  height: 70vh; /* Adjust the height as needed */
`;

const Title = styled.h1`
  text-align: center;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xxxl);
  color: var(--color-title);
  line-height: 0.3;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const BananaImage = styled.img`
  position: absolute;
  bottom: -188px;
  right: -173px;
  transform: rotate(6deg);
  --image-size: 236px
  height: var(--image-size);
  width: var(--image-size);
`;

export default Home;
