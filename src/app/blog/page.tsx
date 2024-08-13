import React from "react";
import Link from "next/link";
import { Post, getSortedPosts } from "@/lib/posts";
import Error from "@/components/Error";

function PostLink({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
      <h3 className="text-xl font-semibold text-yellow-800 mb-2">
        {post.title}
      </h3>
      {post.snippet && (
        <p
          className="text-yellow-700"
          dangerouslySetInnerHTML={{ __html: post.snippet }}
        />
      )}
    </Link>
  );
}

function MainPost({ post }: { post: Post }) {
  return (
    <li className="col-span-full bg-yellow-100 rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
      <PostLink post={post} />
    </li>
  );
}

function SubPost({ post }: { post: Post }) {
  return (
    <li className="bg-yellow-100 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <PostLink post={post} />
    </li>
  );
}

export default async function BlogPage() {
  let allPosts: Post[] = [];
  let error: string | null = null;

  try {
    allPosts = await getSortedPosts();
  } catch (e: any) {
    console.error("Error fetching posts:", e);
    error = e.message;
  }

  const mainPost = allPosts[0];
  const subPosts = allPosts.slice(1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {error && <Error message={error} />}

      {!error && allPosts.length === 0 && (
        <p className="text-yellow-800 text-center py-8">
          No posts available at the moment. Check back later!
        </p>
      )}

      {!error && allPosts.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainPost && <MainPost post={mainPost} />}
          {subPosts.map((post) => (
            <SubPost key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}
