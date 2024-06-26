import { Server as NetServer } from "http";
import { SocketResponse } from "@/lib/types";
import { Server as ServerIo } from "socket.io";
import { db } from "@/services/db";
import { ProfileStatus } from "@prisma/client";

export const config = {
  api: {
    bodYParser: false,
  },
};

export default async function GET(req: Request, res: SocketResponse) {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIo(httpServer, {
      path,
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("a user connected");
    });
  }
  res.end();
}