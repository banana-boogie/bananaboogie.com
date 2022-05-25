import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <footer />
    </>
  );
}

const Header = styled.header`
  min-height: 128px;
`;

const Main = styled.div`
  flex: 1;
  width: clamp(500px, 65%, 700px);
  max-width: 100%;
  padding: 0 16px;
  margin: 0 auto;
`;
