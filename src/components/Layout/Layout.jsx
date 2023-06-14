import styled from "styled-components";

import Header from "@components/Header";
import { QUERIES } from "@/contstants";

export default function Layout({ hideBackButton = false, children }) {
  return (
    <Wrapper>
      <Header hideBackButton={hideBackButton} />
      <Main>{children}</Main>
      <footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  @media ${QUERIES.tabletAndBigger} {
    max-width: 1200px;
  }
`;
const Main = styled.div`
  flex: 1;
  width: clamp(500px, 65%, 700px);
  max-width: 100%;
  padding: 0 16px;
  margin: 0 auto;
`;
