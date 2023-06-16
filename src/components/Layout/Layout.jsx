import styled from "styled-components";

import Header from "@components/Header";
import { QUERIES } from "@/contstants";

export default function Layout({ hideHomeButton = false, children }) {
  return (
    <Wrapper>
      <Header hideHomeButton={hideHomeButton} />
      <main>{children}</main>
      <footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  margin: auto;
  padding: 0 var(--space-sm);
  @media ${QUERIES.tabletAndBigger} {
    max-width: 1200px;
  }
`;
