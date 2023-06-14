import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import { QUERIES } from "@/contstants";

import Icon from "@components/Icon";
import UnstyledButton from "@components/UnstyledButton";

const Header = ({ hideBackButton = false }) => {
  const router = useRouter();
  return (
    <Wrapper>
      {hideBackButton ? (
        <Spacer />
      ) : (
        <BackButton hide={hideBackButton} onClick={() => router.back()}>
          <Icon id="arrow-left" color="black" />
        </BackButton>
      )}
      <NavWrapper>
        <Link href="/trading" passHref>
          <NavLinkText>apps</NavLinkText>
        </Link>
        <Link href="/blog" passHref>
          <NavLinkText>blog</NavLinkText>
        </Link>
      </NavWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: var(--space-lg) var(--space-md);
  margin-bottom: var(--space-sm);

  @media ${QUERIES.tabletAndBigger} {
    padding: var(--space-lg) var(--space-xxl);
    margin-bottom: var(--space-lg);
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const BackButton = styled(UnstyledButton)`
  display: ${({ hide }) => (hide ? "none" : "block")};
  font-size: 1.5rem;
  text-decoration: none;
`;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: right;
  gap: var(--space-md);

  @media ${QUERIES.tabletAndBigger} {
    gap: var(--space-lg);
  }
`;

const NavLinkText = styled.a`
  color: var(--color-title);
  font-family: var(--font-family-subheading);
  text-decoration: none;

  @media ${QUERIES.tabletAndBigger} {
    font-size: calc(4px + var(--font-size-md));
  }
`;

export default Header;
