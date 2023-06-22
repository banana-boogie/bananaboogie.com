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
          <TitleSmaller>HELLO</TitleSmaller>
          <TitleBigger>BANANA</TitleBigger>
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
  display: grid;
  place-content: center;
  isolation: isolate;
  height: 780px;

  @media ${QUERIES.tabletAndBigger} {
    position: relative;
    height: 70vh;
  }
`;

const Title = styled.div`
  z-index: 2;
`;

const TitleSmaller = styled.h2`
  color: var(--brown-monkey-text, #534f2a);
  text-align: center;
  font-size: 30px;
  font-family: Happy Monkey;
  font-weight: lighter;
  line-height: 100%;
`;
const TitleBigger = styled.h1`
  color: var(--brown-monkey-text, #534f2a);
  font-size: 60px;
  font-family: Lilita One;
  line-height: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const BananaImage = styled.img`
  --image-size: 182px;
  height: var(--image-size);
  width: var(--image-size);
  
  position: absolute;
  bottom: -42px;
  right: -33px;
  transform: rotate(19deg);

  @media ${QUERIES.tabletAndBigger} {    
    --image-size: 236px
    height: var(--image-size);
    width: var(--image-size);

    bottom: -188px;
    right: -173px;
    transform: rotate(6deg);
  }
`;

export default Home;
