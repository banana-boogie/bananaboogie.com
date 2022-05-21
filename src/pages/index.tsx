import React from "react";
import Link from "next/link";
import styled from "styled-components";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Title>Banana Boogie</Title>
      <Link href="/position-size-calculator" passHref>
        <NavLinkText>Position Size Calculator</NavLinkText>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 2.5rem;
`;

const NavLinkText = styled.a`
  color: yellow;
  text-decoration: none;
  font-size: 1.125rem;
`;

export default Home;
