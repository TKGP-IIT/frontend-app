import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'

const prisma = PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { senderId, receiverId, content } = req.body;
  if (!senderId || !receiverId || !content) return res.status(400).json({ message: "Invalid data" });

  const message = await prisma.message.create({ data: { senderId, receiverId, content } });

  return res.status(201).json({ message });
}
