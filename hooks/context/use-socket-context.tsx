"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIo, Socket } from "socket.io-client";

interface SocketType {
  socket: Socket | null;
 }

const SocketContext = createContext<SocketType | undefined>({
  socket: null,
});

interface SocketProviderProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const SocketProvider = ({
  children,
  isAuthenticated,
}: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const socketInstance = new (ClientIo as any)("http://localhost:3000", {
        path: "/api/socket/io",
        addTrailingSlash: false,
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider value={{ socket }}>
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