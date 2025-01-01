import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());

let onlineUserMap = new Map();

io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);

  socket.on("user-online", (userId) => {
    onlineUserMap.set(userId, socket.id);
    io.emit("status-update", Array.from(onlineUserMap.keys()));
  });

  socket.on("send-message", ({ senderId, receiverId, message, timestamp }) => {
    console.log({senderId,receiverId,message,timestamp})
    io.emit("receive-message", {
      id: socket.id,
      receiverId,
      senderId,
      message,
      timestamp,
    });
  });

  socket.on("disconnect", () => {
    const userId = [...onlineUserMap].find(([, id]) => id === socket.id)?.[0];
    if (userId) {
      onlineUserMap.delete(userId);
      console.log("a user is disconnected", socket.id);
    }
    io.emit("status-update", Array.from(onlineUserMap.keys()));
  });
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`a socket server is running on http://localhost:${PORT}`);
});
