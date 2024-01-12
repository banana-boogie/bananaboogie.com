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
    <Background background={background}>
      <Wrapper>
        <Header headerTitle={headerTitle} hideHomeButton={hideHomeButton} />
        <main>{children}</main>
        <footer />
      </Wrapper>
    </Background>
  );
}
const Background = styled.div`
  background-color: ${(p) => p.background};
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  margin: auto;
  @media ${QUERIES.tabletAndBigger} {
    max-width: 1200px;
  }
`;
