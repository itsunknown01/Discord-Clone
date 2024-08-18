import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";
import { redirect } from "next/navigation";
import React from "react";

const ServerPage = async ({ params }: { params: { serverId: string } }) => {
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
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel) {
    return redirect(`/channels/${server.id}/${initialChannel.id}`);
  }

  return null;
};

export default ServerPage;
