"use client";

import { Header } from "@/components/common/header";
import { conversationMenuItems } from "@/constants/me-page";
import { useModalStore } from "@/hooks/use-modal-store";
import { FriendsWithProfileAndActivity } from "@/types";
import { Profile } from "@prisma/client";
import { usePathname } from "next/navigation";
import { MenuItem } from "../common/menu-item";
import CurrentUserStatus from "../current-user-status";
import ConversationList from "./conversation-list";

interface ConversationSidebarProps {
  friends: FriendsWithProfileAndActivity[] | undefined;
  profile: Profile | undefined | null;
}

export default function ConversationSidebar({
  friends,
  profile,
}: ConversationSidebarProps) {
  const { onOpen } = useModalStore();

  const pathname = usePathname();

  return (
    <div className="h-screen w-60 bg-zinc-800 flex flex-col">
      <Header verticalPadding="px-2" className="bg-zinc-800">
        <button
          onClick={() => onOpen("searchModal")}
          className="flex w-full justify-between rounded-sm bg-black p-1.5 text-left text-xs text-gray-400 hover:bg-black/70"
        >
          Find your friends & chats
          <div className="rounded-sm bg-gray-800/50 px-1 text-[11px]">
            Ctrl K
          </div>
        </button>
      </Header>
      <div className="hover-scrollbar flex-1 overflow-y-auto py-2 px-1">
        <div className="w-full space-y-1 px-2">
          {conversationMenuItems.map((item, i) => (
            <MenuItem
              key={i}
              href={item.href}
              active={pathname == item.href}
              icon={<item.icon fontSize={20} />}
              name={item.name}
              count={item.count}
            />
          ))}
        </div>
        <ConversationList friends={friends} profileId={profile!.id} />
      </div>
      <CurrentUserStatus profile={profile} />
    </div>
  );
}
