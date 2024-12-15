import React, { ReactNode } from "react";

import ChannelSidebar from "@/components/server/server-sidebar";

const ServerLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { serverId: string };
}) => {
  return (
    <div className="h-full w-full">
      <div className="w-60 flex flex-col fixed inset-y-0 z-20">
        <ChannelSidebar serverId={params!.serverId} />
      </div>
      <main className="h-screen pl-60 w-full">{children}</main>
    </div>
  );
};

export default ServerLayout;