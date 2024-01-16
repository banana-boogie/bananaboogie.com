import Head from "next/head";
import Layout from "@/components/Layout";
import Date from "@components/Date";
import { getPostData, getAllPostIds } from "@/lib/posts";

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
      <Date dateString={postData.date} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
