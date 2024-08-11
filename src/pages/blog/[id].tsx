import Head from "next/head";
import Layout from "@/components/Layout";
import Date from "@components/Date";
import { getPostData, getAllPostIds } from "@/lib/posts";
import styled from "styled-components";

import { QUERIES } from "@/contstants";

type StaticProps = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: StaticProps) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

type PostData = {
  title: string;
  date: string;
  contentHtml: string;
};

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout background="var(--color-background-blog)" headerTitle="Banana Blog">
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Wrapper>
        <Title>{postData.title}</Title>
        <Divider />
        <Content dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <DateItem dateString={postData.date} />
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  padding: 0 var(--space-lg);
  margin-top: var(--space-lg);

  @media ${QUERIES.tabletAndBigger} {
    max-width: 800px;
    margin: 0 auto;
    margin-top: calc(var(--space-xxl) + 24px);
  }
`;

const Title = styled.h1`
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-sm);
`;

const Divider = styled.hr`
  margin-bottom: var(--space-xl);
`;

const Content = styled.div`
  p:first-of-type {
    text-indent: var(--space-md);

    &::first-letter {
      font-size: 200%; /* Adjust the value as needed */
      font-weight: bold; /* Optional, for added emphasis */
    }
  }

  margin-bottom: var(--space-xxl);
`;

const DateItem = styled(Date)`
  display: flex;
  flex-direction: row-reverse;
`;
