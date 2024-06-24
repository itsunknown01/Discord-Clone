"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIo, Socket } from "socket.io-client";

interface SocketType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketType | undefined>({
  socket: null,
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new (ClientIo as any)("http://localhost:3000", {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
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