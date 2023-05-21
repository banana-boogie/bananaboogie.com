import styled from "styled-components";
import type { AppProps } from "next/app";
import GlobalStyles from "@components/GlobalStyles";

import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/800.css";

function BananaSite({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <GlobalStyles />
      <Component {...pageProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default BananaSite;
