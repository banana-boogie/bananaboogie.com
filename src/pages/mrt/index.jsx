import * as React from "react";
import styled from "styled-components";
import Layout from "@components/Layout";
import Link from "next/link";

const MRT = () => {
  return (
    <Layout hideBackButton={true}>
      <Wrapper>
        <Title>MRT</Title>
        <Link href="/mrt/projects">Projects</Link>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  min-height: 100%;
  margin-bottom: 250px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 36px;
`;

export default MRT;
