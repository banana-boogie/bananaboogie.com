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
          <Link passHref href="/trading/options-tool">
            Options Tool
          </Link>
          <Link passHref href="/trading-old/risk-calculator">
            Risk Calculator
          </Link>
          <Link passHref href="/trading-old/shares-to-buy-calculator">
            Shares To Buy Calculator
          </Link>
          <Link passHref href="/trading-old/position-size-calculator">
            Position Size Calculator
          </Link>
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
  color: var(--color-font-primary);
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

const Link = styled(NextLink)`
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.5rem;

  &:hover {
    color: var(--color-accent);
  }
`;

export default MRT;
