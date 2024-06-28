"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const server = (0, http_1.createServer)();
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"],
    },
});
let onlineMap = [];
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
