"use client";

import { Profile } from "@prisma/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextValue {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const SocketProvider = ({
  children,
  profile,
}: {
  children: ReactNode;
  profile: Profile;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    newSocket.emit("user-online", profile.id);
    setSocket(newSocket);

    newSocket.on("status-update", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [profile.id]);

  const value = useMemo(() => ({ socket, onlineUsers }), [socket, onlineUsers]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket must be used within a SocketProvider");
  return context;
};
