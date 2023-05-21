import styled from "styled-components";
import { useRouter } from "next/router";
import UnstyledButton from "@components/UnstyledButton";
import Icon from "@components/Icon";

export default function Layout({ hideBackButton = false, children }) {
  const router = useRouter();

  return (
    <>
      <Header>
        <BackButton hide={hideBackButton} onClick={() => router.back()}>
          <Icon id="arrow-left" color="white" />
        </BackButton>
      </Header>
      <Main>{children}</Main>
      <footer />
    </>
  );
}

const Header = styled.header`
  min-height: 128px;
`;

const BackButton = styled(UnstyledButton)`
  display: ${({ hide }) => (hide ? "none" : "block")};
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  margin: 32px;
`;

const Main = styled.div`
  flex: 1;
  width: clamp(500px, 65%, 700px);
  max-width: 100%;
  padding: 0 16px;
  margin: 0 auto;
`;
