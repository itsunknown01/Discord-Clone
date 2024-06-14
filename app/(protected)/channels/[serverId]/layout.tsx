import ServerSidebar from "@/components/server/server-sidebar";
import React, { ReactNode } from "react";

const ServerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ServerSidebar />
      {children}
    </>
  );
};

export default ServerLayout;
