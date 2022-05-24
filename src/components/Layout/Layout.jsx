import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <>
      <header />
      <Main>{children}</Main>
      <footer />
    </>
  );
}

const Main = styled.div`
  flex: 1;
  max-width: 512px;
  padding: 0 16px;
  margin: 0 auto;
`;
