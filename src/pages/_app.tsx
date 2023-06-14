import styled from "styled-components";
import type { AppProps } from "next/app";
import GlobalStyles from "@components/GlobalStyles";

// Supports weights 100-900
import "@fontsource/open-sans";
import "@fontsource-variable/noto-sans-canadian-aboriginal";

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
