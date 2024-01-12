import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import { QUERIES } from "@/contstants";

import UnstyledButton from "@components/UnstyledButton";

const Header = ({ hideHomeButton = false, headerTitle = "" }) => {
  const router = useRouter();
  return (
    <Wrapper>
      {hideHomeButton ? (
        <Spacer />
      ) : (
        <BackButton
          hide={hideHomeButton}
          onClick={() => router.pathname !== "/" && router.push("/")}
        >
          <BananaImage src="/images/tropical_circle.png" alt="home button" />
        </BackButton>
      )}
      {headerTitle && <Title>{headerTitle}</Title>}
      <NavWrapper>
        <Link href="/blog" passHref>
          <NavLinkText>blog</NavLinkText>
        </Link>
        <Link href="/trading" passHref>
          <NavLinkText>apps</NavLinkText>
        </Link>
      </NavWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 64px;
  padding: 0px var(--space-md);
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);

  @media ${QUERIES.tabletAndBigger} {
    padding: 0 var(--space-xxl);
    padding-top: var(--space-xl);
    margin-bottom: var(--space-lg);
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const BackButton = styled(UnstyledButton)`
  --image-size: 42px;

  display: ${({ hide }) => (hide ? "none" : "block")};
  position: relative;
  height: var(--image-size);
  width: var(--image-size);
`;

const BananaImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: var(--image-size);
  width: var(--image-size);
  /* transform: rotate(12deg); */

  border-radius: var(--border-radius-xxl);

  opacity: 0.6;
  filter: drop-shadow(0 0 24px rgba(0, 0, 0, 0.3));
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: drop-shadow(0 0 20px green) brightness(100%);
    transform: scale(1.1);
  }

  @media ${QUERIES.tabletAndBigger} {
  }
`;

const Title = styled.h1`
  color: var(--color-font-primary);
  text-align: left;
  line-height: 1;
  font-size: calc(12px + var(--font-size-xl));
  font-family: var(--font-family-heading);

  @media ${QUERIES.tabletAndBigger} {
    font-size: var(--font-size-xxl);
  }
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
  color: var(--color-font-primary);
  text-decoration: none;
  text-align: center;
  font-size: var(--font-size-sm);
  font-family: var(--font-family-subheading);
  line-height: 100%;

  @media ${QUERIES.tabletAndBigger} {
    font-size: var(--font-size-sm);
  }
`;

export default Header;
