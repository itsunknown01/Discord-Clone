"use client";

import { ChevronDown, Plus, Settings } from "lucide-react";
import ActionTooltip from "../feature/action-tooltip";
import { Channel, MemberRole, Server } from "@prisma/client";
import { useState } from "react";
import { ServerChannel } from "./server-channel";

interface ServerCategoryProps {
  role: MemberRole;
  label: string;
  channels: Channel[];
  server: any;
}

export default function ServerCategory({
  role,
  label,
  channels,
  server,
}: ServerCategoryProps) {
  const [dropdown, setDropdown] = useState(true);
  return (
    <>
      <div className="flex items-center justify-between py-2">
        <p
          className="flex justify-center text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400 cursor-pointer"
          onClick={() => setDropdown(!dropdown)}
        >
          <ChevronDown className="h-5 w-5 mr-1" /> {label}
        </p>
        {role !== MemberRole.GUEST && (
          <ActionTooltip label="Create Channel" side="top">
            <button
              //   onClick={() => onOpen("createChannel", { channelType })}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            >
              <Plus className="h-4 w-4" />
            </button>
          </ActionTooltip>
        )}
        {/* {role === MemberRole.ADMIN && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            //   onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )} */}
      </div>
      <div className={`space-y-[2px] ${!dropdown ? "hidden" : ""}`}>
        {channels.map((channel) => (
          <ServerChannel
            key={channel.id}
            role={role}
            channel={channel}
            server={server}
          />
        ))}
      </div>
    </>
  );
}
