import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import { QUERIES } from "@/contstants";

import UnstyledButton from "@components/UnstyledButton";

const Header = ({ hideHomeButton = false }) => {
  const router = useRouter();
  return (
    <Wrapper>
      {hideHomeButton ? (
        <Spacer />
      ) : (
        <BackButton hide={hideHomeButton} onClick={() => router.push("/")}>
          <BananaImage
            src="/banana.svg"
            alt="picture of a digitally drawn banana"
          />
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
  --image-size: 50px;

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
  transform: rotate(12deg);

  filter: drop-shadow(0 0 12px rgba(0, 0, 0, 0.3));
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: drop-shadow(0 0 20px purple) brightness(110%);
    transform: scale(1.1);
  }

  @media ${QUERIES.tabletAndBigger} {
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
  color: var(--color-title);
  font-family: var(--font-family-subheading);
  text-decoration: none;

  @media ${QUERIES.tabletAndBigger} {
    font-size: calc(4px + var(--font-size-md));
  }
`;

export default Header;
