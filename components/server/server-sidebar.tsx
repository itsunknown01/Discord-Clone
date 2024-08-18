import React, { Fragment } from "react";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { currentProfile } from "@/lib/profile/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/services/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { MdEvent } from "react-icons/md";
import ServerCategory from "./server-category";
import { ServerChannel } from "./server-channel";
import CurrentUserStatus from "../current-user-status/current-user-status";
import ServerVoiceContol from "./server-voice-contol";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/channels/me");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      categories: {
        include: {
          channels: {
            include: {
              profile: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
      channels: {
        include: {
          profile: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) return redirect("/channels/me");

  const channels = server.channels;
  const channelsWithCategory = server.categories;

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full bg-[#2B2D31] text-white">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2 flex items-center">
          <MdEvent className="mr-2" /> Events
        </div>
        <Separator className="bg-zinc-700 rounded-md my-2" />
        {channelsWithCategory.length > 0
          ? channelsWithCategory.map((category) => (
              <Fragment key={category.id}>
                <ServerCategory
                  role={role as MemberRole}
                  label={category.name}
                  channels={category.channels}
                  server={server}
                />
              </Fragment>
            ))
          : channels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                server={server}
              />
            ))}
      </ScrollArea>
      <ServerVoiceContol
        currentUser={profile}
        server={server}
      />
      <CurrentUserStatus profile={profile} />
    </div>
  );
};

export default ServerSidebar;
