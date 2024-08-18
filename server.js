const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    let onlineMap = [];
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
    
    socket.emit("me",socket.id)

    socket.on("callUser", (data) => {
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
    });

    socket.on("acceptCall", (data) => {
      io.to(data.to).emit("callUser", data.signal);
    });

    socket.on("disconnect", () => {
      onlineMap = onlineMap.filter((user) => user.socketId !== socket.id);
      io.emit("Online", onlineMap);
      console.log("a user disconnected", socket.id);
      socket.broadcast.emit("callEnded");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
