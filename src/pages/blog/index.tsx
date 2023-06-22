import React from "react";
import type { NextPage } from "next";
import styled from "styled-components";

import { QUERIES } from "@/contstants";
import Layout from "@/components/Layout/Layout";

const Blog: NextPage = () => {
  return (
    <Layout>
      <Wrapper>
        <Title>Banana Blog</Title>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  width: clamp(500px, 65%, 700px);
  max-width: 100%;
  padding: 0 var(--space-md);
  margin: 0 auto;
  @media ${QUERIES.tabletAndBigger} {
    padding: 0;
    width: clamp(500px, 65%, 1200px);
  }
`;

const Title = styled.h1`
  color: var(--color-font-primary);
  text-align: left;
  line-height: 1;
  font-size: calc(12px + var(--font-size-xl));
  font-family: var(--font-family-heading);

  @media ${QUERIES.tabletAndBigger} {
    font-size: var(--font-size-xxxl);
  }
`;

export default Blog;
