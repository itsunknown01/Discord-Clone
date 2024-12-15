import React, { Fragment } from "react";
import { MdEvent } from "react-icons/md";

import { profile, servers } from "@/data";
import ChannelSidebarHeader from "./server-sidebar-header";
import { MemberRole, Server } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import CurrentUserStatus from "../current-user-status";
import ServerSidebarCategory from "./server-sidebar-category";
import ServerSidebarChannel from "./server-sidebar-channel";

const ChannelSidebar = ({ serverId }: { serverId: string }) => {
  const server = servers.find((server) => server.id === serverId);

  const serverWithCategory = server!.categories;
  const channels = server!.channels;

  const role = server?.members.find((member) => member.profileId === profile.id)
    ?.role as MemberRole;

  return (
    <div className="flex flex-col h-full text-primary w-full bg-zinc-800 text-white">
      <ChannelSidebarHeader server={server} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-4 flex items-center">
          <MdEvent className="mr-2" /> Events
        </div>
        <Separator className="bg-zinc-700 rounded-md my-2" />
        {serverWithCategory.length > 0
          ? serverWithCategory.map((category) => (
              <Fragment key={category.id}>
                <ServerSidebarCategory
                  server={server}
                  channels={category.channels}
                  label={category.name}
                  role={role}
                />
              </Fragment>
            ))
          : channels.map((channel) => (
              <ServerSidebarChannel
                key={channel.id}
                server={server}
                channel={channel}
                role={role}
              />
            ))}
      </ScrollArea>
      <CurrentUserStatus profile={profile} />
    </div>
  );
};

export default ChannelSidebar;
