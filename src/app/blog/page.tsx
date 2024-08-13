import React from "react";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

type SubPost = {
  id: string;
  title: string;
  snippet: string;
};

export default async function BlogPage() {
  const allPostsData = await getSortedPostsData();
  const mainPost = allPostsData[0];
  const subPosts = allPostsData.slice(1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mainPost && (
          <li className="col-span-full bg-yellow-100 rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
            <Link href={`/blog/${encodeURIComponent(mainPost.id)}`}>
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">
                {mainPost.title}
              </h2>
              <p
                className="text-yellow-700"
                dangerouslySetInnerHTML={{ __html: mainPost.snippet }}
              />
            </Link>
          </li>
        )}
        {subPosts.map(({ id, title, snippet }: SubPost) => (
          <li
            key={id}
            className="bg-yellow-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/blog/${encodeURIComponent(id)}`}>
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                {title}
              </h3>
              <p
                className="text-yellow-700"
                dangerouslySetInnerHTML={{ __html: snippet }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
