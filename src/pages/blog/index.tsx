import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { QUERIES } from "@/contstants";
import Layout from "@/components/Layout/Layout";

import { getSortedPostsData } from "@/lib/posts";

type SubPost = {
  id: string;
  title: string;
  snippet: string;
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
}

const Blog = ({ allPostsData }: { allPostsData: any }) => {
  const mainPost = allPostsData[0];
  const subPosts = allPostsData.slice(1);
  return (
    <Layout background="var(--color-background-blog)" headerTitle="Banana Blog">
      <Wrapper>
        <PostsWrapper>
          <Link passHref href={`/blog/${encodeURIComponent(mainPost.id)}`}>
            <MainPost>
              <MainPostTitle>{mainPost.title}</MainPostTitle>
              <MainPostSnippet
                dangerouslySetInnerHTML={{ __html: mainPost.snippet }}
              />
            </MainPost>
          </Link>
          {subPosts.map(({ id, title, snippet }: SubPost) => (
            <Link key={id} passHref href={`/blog/${encodeURIComponent(id)}`}>
              <SubPost>
                <SubPostTitle>{title}</SubPostTitle>
                <SubPostSnippet dangerouslySetInnerHTML={{ __html: snippet }} />
              </SubPost>
            </Link>
          ))}
        </PostsWrapper>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  width: clamp(500px, 65%, 700px);
  max-width: 100%;
  padding: 0 var(--space-md);
  margin: 0 auto;
  @media ${QUERIES.tabletAndBigger} {
    padding: 0;
    width: clamp(500px, 65%, 1200px);
  }
`;

const PostsWrapper = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: var(--space-xxl);
  grid-row-gap: var(--space-xl);
  margin-top: var(--space-xl);
`;

const MainPost = styled.li`
  grid-column: span 2;
  min-height: 300px;

  margin: var(--space-lg) 0;
  padding: var(--space-xl);

  border-radius: var(--border-radius-xs);
  box-shadow: 0px 1px 1px 0px hsla(0, 0%, 0%, 0.25);
  background-color: var(--color-background-blog-main-post);

  &:hover {
    cursor: pointer;
  }
`;
const MainPostTitle = styled.h1`
  font-size: var(--font-size-xl);
`;
const MainPostSnippet = styled.p`
  margin-top: var(--space-md);
  font-size: var(--font-size-sm);
`;

const SubPost = styled.li`
  gap: 100px;
  min-height: 160px;
  padding: var(--space-md);

  background-color: var(--color-background-blog-sub-post);
  border-radius: 24px;
  border-radius: var(--border-radius-xs);

  &:hover {
    cursor: pointer;
  }
`;

const SubPostSnippet = styled.p`
  margin-top: var(--space-sm);
`;

const SubPostTitle = styled.h2``;

export default Blog;
