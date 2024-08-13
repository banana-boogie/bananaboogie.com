import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { POSTS_DIRECTORY } from "@/contstants/blog";

export interface Post {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
  [key: string]: any;
}

function getPostFilenames(): string[] {
  return fs.readdirSync(POSTS_DIRECTORY);
}

function getPostFilePath(filename: string): string {
  return path.join(POSTS_DIRECTORY, filename);
}

function parsePostContent(fileContents: string): {
  data: any;
  content: string;
} {
  return matter(fileContents);
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getSortedPosts(): Post[] {
  const filenames = getPostFilenames();
  const allPosts = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = getPostFilePath(filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = parsePostContent(fileContents);

    return {
      slug,
      ...data
    } as Post;
  });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  try {
    const fullPath = getPostFilePath(`${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = parsePostContent(fileContents);
    const contentHtml = await markdownToHtml(content);

    return {
      slug,
      contentHtml,
      title: data.title,
      date: data.date,
      ...data
    };
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return undefined;
  }
}

export function getAllPostSlugs() {
  const filenames = getPostFilenames();
  return filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, "")
    }
  }));
}
