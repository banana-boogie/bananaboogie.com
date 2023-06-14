import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <NavWrapper>
        <Link href="/trading" passHref>
          <NavLinkText>apps</NavLinkText>
        </Link>
        <Link href="/mrt" passHref>
          <NavLinkText>blog</NavLinkText>
        </Link>
      </NavWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: var(--space-lg) var(--space-xxl);
`;

const NavWrapper = styled.nav`
  display: flex;
  gap: var(--space-lg);
`;

const NavLinkText = styled.a`
  color: var(--color-title);
  text-decoration: none;
  font-size: calc(4px + var(--font-size-md));
  font-family: var(--font-family-subheading);
`;

export default Header;
