"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAddServerMutation } from "../redux/api/dashboard/servers/serverSlice";
import { useCreateRequestMutation } from "../redux/api/dashboard/friend-request/requestSlice";

interface SocketType {
  socket: Socket | null;
  onlineUsers: {
    userId: string;
    socketId: string;
  }[];
}

const SocketContext = createContext<SocketType | undefined>({
  socket: null,
  onlineUsers: [],
});

interface SocketProviderProps {
  children: React.ReactNode;
  profile: any;
}

export const SocketProvider = ({ children, profile }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<
    { userId: string; socketId: string }[]
  >([]);

  const [createRequest, { isLoading, isSuccess }] = useCreateRequestMutation();

  const isAuthenticated = !!profile;

  useEffect(() => {
    if (isAuthenticated) {
      const socketInstance = io("http://localhost:4000");

      socketInstance.emit("login", profile.id);

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [isAuthenticated, profile?.id]);

  useEffect(() => {
    if (socket) {
      socket.on("Online", (onlineUsers) => {
        setOnlineUsers(onlineUsers);
      });

      socket.on("friendRequest", async ({ senderId, receiverId }) => {
        await createRequest({ senderId, receiverId }).unwrap();
      });

      return () => {
        socket.off("Online");
        socket.off("friendRequest")
      };
    }
  }, [socket,createRequest]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
