import Head from "next/head";
import styled from "styled-components";

import Header from "@components/Header";
import { QUERIES } from "@/contstants";

export default function Layout({
  background = "var(--color-background-default)",
  headerTitle = "",
  hideHomeButton = false,
  children
}) {
  return (
    <Wrapper>
      <Head>
        <style>
          {`html, body {
            background-color: ${background}
          }`}
        </style>
      </Head>
      <Header headerTitle={headerTitle} hideHomeButton={hideHomeButton} />
      <main>{children}</main>
      <footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  margin: auto;
  @media ${QUERIES.tabletAndBigger} {
    max-width: 1200px;
  }
`;
