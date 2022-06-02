// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  name: string;
};

type Error = {
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  // Create new home
  if (req.method === "POST") {
    const { name } = req.body;
    try {
      const saved = await prisma.project.create({
        data: { name }
      });

      res.status(200).json(saved);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating project." });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
