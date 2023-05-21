import * as React from "react";
import styled from "styled-components";
import Layout from "@components/Layout";
import NextLink from "next/link";

const MRT = () => {
  return (
    <Layout hideBackButton={true}>
      <Wrapper>
        <Title>Trading Co.</Title>
        <LinkWrapper>
          <NextLink passHref href="/trading/risk-calculator">
            <LinkText>Risk Calculator</LinkText>
          </NextLink>
          <NextLink passHref href="/trading/shares-to-buy-calculator">
            <LinkText>Shares To Buy Calculator</LinkText>
          </NextLink>
          <NextLink passHref href="/trading/position-size-calculator">
            <LinkText>Position Size Calculator</LinkText>
          </NextLink>
        </LinkWrapper>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  margin-bottom: 250px;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 36px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const LinkText = styled.a`
  color: yellow;
  text-decoration: none;
  font-size: 1.5rem;

  &:hover {
    color: var(--color-accent);
  }
`;

export default MRT;
