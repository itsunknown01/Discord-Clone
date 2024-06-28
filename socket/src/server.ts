import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

interface onlineState {
  userId: string;
  socketId: string;
}

let onlineMap: onlineState[] = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("login", (userId) => {
    !onlineMap.some((user) => user.userId === userId) &&
      onlineMap.push({
        userId,
        socketId: socket.id,
      });

    io.emit("Online", onlineMap);
    console.log(onlineMap);
  });

  socket.on("sendFriendRequest", ({ senderId, receiverId }) => {
    io.emit("friendRequest", { senderId, receiverId });
    io.emit("friendRequestNotification", {
      senderId,
      isRead: false,
    });
  });

  socket.on("disconnect", () => {
    onlineMap = onlineMap.filter((user) => user.socketId !== socket.id);
    io.emit("Online", onlineMap);
    console.log("a user disconnected", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server started at 4000");
});
