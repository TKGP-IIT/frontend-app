import { Server as SocketServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client/edge'

const prisma = new PrismaClient()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!res.socket.server.io) {
    const io = new SocketServer(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("send-message", async ({ senderId, receiverId, content }) => {
        const message = await prisma.message.create({ data: { senderId, receiverId, content } });
        io.emit("receive-message", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
  res.end();
}
