"use client";

import {
  ChannelType,
  MemberRole,
  ServerWithMemberWithProfiles,
} from "@/lib/mock-data/channel";
import ActionTooltip from "../feature/action-tooltip";
import { Plus, Settings } from "lucide-react";

interface ServerSectionProps {
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  role?: MemberRole;
  label: string;
  server?: ServerWithMemberWithProfiles;
}

export default function ServerSection({
    sectionType,
    channelType,
    role,
    label,
    server,
} : ServerSectionProps) {
    return (
        <div className="flex items-center justify-between py-2">
        <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        {role !== MemberRole.GUEST && sectionType === "channels" && (
          <ActionTooltip label="Create Channel" side="top">
            <button
              onClick={() => {}}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            >
              <Plus className="h-4 w-4 " />
            </button>
          </ActionTooltip>
        )}
  
        {role === MemberRole.ADMIN && sectionType === "members" && (
          <ActionTooltip label="Manage Members" side="top">
            <button
              onClick={() => {}}
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            >
              <Settings className="h-4 w-4 " />
            </button>
          </ActionTooltip>
        )}
      </div>
        );
}
