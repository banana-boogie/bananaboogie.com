import styled from "styled-components";
import type { AppProps } from "next/app";
import GlobalStyles from "@components/GlobalStyles";

function BananaSite({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <GlobalStyles />
      <Component {...pageProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
`;

export default BananaSite;
