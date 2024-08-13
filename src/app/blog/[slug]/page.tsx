import React from "react";
import { notFound } from "next/navigation";
import { getPost, getAllPostSlugs } from "@/lib/posts";
import Date from "@/components/Date";

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return { title: post?.title || "Blog Post" };
}

export default async function Post({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await getPost(params.slug);
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <hr className="border-gray-300 mb-8" />
      <div
        className="prose font-open-sans max-w-none mb-12 [&>p]:mb-6 [&>p:first-of-type]:indent-6 [&>p:first-of-type:first-letter]:text-3xl [&>p:first-of-type:first-letter]:font-bold"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <div className="flex justify-end">
        <Date dateString={post.date} />
      </div>
    </article>
  );
}
