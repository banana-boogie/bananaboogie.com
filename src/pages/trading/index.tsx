import * as React from "react";
import styled from "styled-components";
import Layout from "@components/Layout";
import NextLink from "next/link";
import { QUERIES } from "@/contstants";

const MRT = () => {
  return (
    <Layout hideHomeButton={false}>
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
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  width: clamp(500px, 65%, 700px);
  max-width: 100%;
  margin: 0 auto;

  @media ${QUERIES.tabletAndBigger} {
    max-width: 1200px;
  }
`;

const Title = styled.h1`
  color: var(--color-title);
  text-align: center;
  line-height: 1;
  font-size: calc(12px + var(--font-size-xxl));
  font-family: var(--font-family-heading);

  margin-bottom: var(--space-md);
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);

  padding: 0px var(--space-md);
`;

const LinkText = styled.a`
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.5rem;

  &:hover {
    color: var(--color-accent);
  }
`;

export default MRT;
