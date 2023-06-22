import styled from "styled-components";
import type { AppProps } from "next/app";
import GlobalStyles from "@components/GlobalStyles";

import "@fontsource/open-sans"; // Supports weights 100-900
import "@fontsource-variable/noto-sans-canadian-aboriginal";
import "@fontsource/happy-monkey";
import "@fontsource/lilita-one";

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
