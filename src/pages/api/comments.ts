// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  author: string;
  comment: string;
  keywords: string[];
  link: string;
  tags?: string[];
  projectId: string;
  subreddit: string | null;
  postedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

type Error = {
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    id,
    author,
    comment,
    link,
    postedAt,
    tags,
    projectId,
    keywords,
    subreddit
  } = req.body;

  // Create new home
  if (req.method === "POST") {
    try {
      const saved = await prisma.comment.create({
        data: {
          author,
          comment,
          link,
          postedAt,
          projectId,
          keywords,
          subreddit,
          tags: {
            create: tags.map((t: { id: string }) => {
              return {
                tag: {
                  connect: { id: t.id }
                }
              };
            })
          }
        }
      });

      res.status(200).json(saved);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving comment" });
    }
  } else if (req.method === "PATCH") {
    try {
      const update = await prisma.comment.update({
        where: { id },
        data: {
          tags: {
            deleteMany: {},
            create: tags.map((t: { id: string }) => ({
              tag: { connect: { id: t.id } }
            }))
          }
        },
        include: { tags: true }
      });
      res.status(200).json(update);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating comment" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST", "PATCH"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
