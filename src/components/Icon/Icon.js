import React from "react";
import styled from "styled-components";
import {
  Search,
  Menu,
  ShoppingBag,
  ChevronDown,
  X,
  Instagram,
  Youtube,
  Facebook,
  Loader,
  Copy,
  Link,
  Save,
  FilePlus,
  Plus,
  Tag,
  ArrowLeft
} from "./IconPack";

const icons = {
  search: Search,
  menu: Menu,
  "shopping-bag": ShoppingBag,
  "chevron-down": ChevronDown,
  close: X,
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  loader: Loader,
  copy: Copy,
  link: Link,
  save: Save,
  "file-plus": FilePlus,
  plus: Plus,
  tag: Tag,
  "arrow-left": ArrowLeft
};

const Icon = ({ id, color = "black", size, strokeWidth, ...delegated }) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <Wrapper strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > svg {
    display: block;
    stroke-width: ${(p) =>
      p.strokeWidth !== undefined ? p.strokeWidth + "px" : undefined};
  }
`;

export default Icon;
