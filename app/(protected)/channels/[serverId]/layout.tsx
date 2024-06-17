import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/services/db";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const ServerLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/login');
  }

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
    return redirect("/dashboard");
  }
  return (
    <>
      <ServerSidebar serverId={params.serverId} />
      {children}
    </>
  );
};

export default ServerLayout;
