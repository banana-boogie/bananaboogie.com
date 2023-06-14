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
  padding: var(--space-lg) 0px;
`;

const NavWrapper = styled.nav`
  display: flex;
  gap: var(--space-lg);
`;

const NavLinkText = styled.a`
  color: yellow;
  text-decoration: none;
  font-size: 1.125rem;
`;

export default Header;
