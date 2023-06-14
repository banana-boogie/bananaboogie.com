import React from "react";
import type { NextPage } from "next";
import styled from "styled-components";

import Header from "@/components/Header";
import { QUERIES } from "@/contstants";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header hideBackButton={true} />
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

  @media ${QUERIES.tabletAndBigger} {
    max-width: 1200px;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;

  @media ${QUERIES.tabletAndBigger} {
    flex-direction: revert;
    justify-content: revert;

    display: grid;
    place-content: center;
    position: relative;
    height: 70vh;
  }
`;

const Title = styled.h1`
  color: var(--color-title);
  text-align: center;
  line-height: 0.3;
  font-size: calc(12px + var(--font-size-xxl));
  font-family: var(--font-family-heading);

  @media ${QUERIES.tabletAndBigger} {
    font-size: var(--font-size-xxxl);
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;

const BananaImage = styled.img`
  transform: rotate(21deg);
  --image-size: 188px;
  height: var(--image-size);
  width: var(--image-size);
  margin-top: var(--space-lg);
  margin-left: var(--space-xl);

  @media ${QUERIES.tabletAndBigger} {
    position: absolute;
    bottom: -188px;
    right: -173px;
    transform: rotate(6deg);

    --image-size: 236px
    height: var(--image-size);
    width: var(--image-size);
  }
`;

export default Home;
