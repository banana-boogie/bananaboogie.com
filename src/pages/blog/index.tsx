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

const Wrapper = styled.div``;

const Title = styled.h1`
  color: var(--color-title);
  text-align: center;
  line-height: 1;
  font-size: calc(12px + var(--font-size-xxl));
  font-family: var(--font-family-heading);

  @media ${QUERIES.tabletAndBigger} {
    font-size: var(--font-size-xxxl);
  }
`;

export default Blog;
