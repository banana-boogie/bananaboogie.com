import React from "react";
import Link from "next/link";
import styled from "styled-components";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Title>Banana Boogie</Title>
      <NavWrapper>
        <Link href="/position-size-calculator" passHref>
          <NavLinkText>Position Size Calculator</NavLinkText>
        </Link>
        <Link href="/mrt" passHref>
          <NavLinkText>M.R.T.</NavLinkText>
        </Link>
      </NavWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
`;

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NavLinkText = styled.a`
  color: yellow;
  text-decoration: none;
  font-size: 1.125rem;
`;

export default Home;
