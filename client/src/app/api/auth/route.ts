import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client'

const prisma = PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });

  return res.status(201).json({ user });
}
