import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";
import { redirect } from "next/navigation";
import React from "react";

interface ChannelLayoutPrpos {
  children: React.ReactNode;
  params: {
    serverId: string;
  };
}

const ChannelLayout = async ({ children, params }: ChannelLayoutPrpos) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/login");

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full w-full">
      <div className="w-60 flex flex-col fixed inset-y-0 z-20">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-screen pl-60 w-full">{children}</main>
    </div>
  );
};

export default ChannelLayout;
