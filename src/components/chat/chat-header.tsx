"use client";

import React, { useEffect, useState } from "react";
import {
  BiNotification,
  BiPin,
  BiSolidPhoneCall,
  BiSolidUserAccount,
  BiSolidUserCircle,
  BiSolidVideo,
  BiUserCircle,
} from "react-icons/bi";
import {
  BsChatRightFill,
  BsFillPeopleFill,
  BsGithub,
  BsInboxFill,
} from "react-icons/bs";

import { PageHeader } from "../ui/page";
import UserAvatar from "../common/user-avatar";
import {
  PopoverTooltipContent,
  PopoverTooltipProvider,
} from "../feature/popover-tooltip";
import { cn } from "@/lib/utils";
import HybridButton from "../ui/hybrid-button";
import { Bell, Hash } from "lucide-react";
import { useParams } from "next/navigation";
import { useSocket } from "../providers/socket-provider";
import { UserStatus } from "@prisma/client";

const headerIcons = [
  {
    icon: <BiSolidPhoneCall size={20} />,
    tooltip: "Start a voice call",
    href: "",
  },
  {
    icon: <BiSolidVideo size={20} />,
    tooltip: "Start a video call",
    href: "",
  },
  {
    icon: <BiPin size={20} />,
    tooltip: "Pin Message",
    href: "",
  },
  {
    icon: <BsFillPeopleFill size={18} />,
    tooltip: "Create private Message",
    href: "",
  },
  {
    icon: <BiSolidUserCircle size={20} />,
    tooltip: "Toggle profile info",
    href: "",
  },
  { icon: "search", tooltip: "Search", href: "" },
  { icon: <BsInboxFill size={20} />, tooltip: "Inbox", href: "" },
  {
    icon: <BsGithub size={20} />,
    href: "https://github.com/igorm84/rediscord",
    tooltip: "Author github",
  },
];

const channelChatIcons = [
  {
    icon: <Hash className="h-5 w-5" />,
    tooltip: "Threads",
    href: "",
  },
  {
    icon: <Bell size={20} />,
    tooltip: "Notification Settings",
    href: "",
  },
  {
    icon: <BiPin size={20} />,
    tooltip: "Pin Message",
    href: "",
  },
  {
    icon: <BsFillPeopleFill size={18} />,
    tooltip: "Create private Message",
    href: "",
  },
  { icon: "search", tooltip: "Search", href: "" },
  { icon: <BsInboxFill size={20} />, tooltip: "Inbox", href: "" },
  {
    icon: <BsGithub size={20} />,
    href: "https://github.com/igorm84/rediscord",
    tooltip: "Author github",
  },
];

interface ChatHeaderProps {
  imageUrl: string | null;
  name: string;
  otherProfileId: string;
  type: "server" | "direct";
}

const ChatHeader = ({
  name,
  imageUrl,
  otherProfileId,
  type
}: ChatHeaderProps) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<UserStatus>(UserStatus.Offline);

  const iconsArray = type === "direct" ? headerIcons : channelChatIcons;

  const { onlineUsers } = useSocket();

  useEffect(() => {
    const statusMap: { [key: string]: void } = {};

    statusMap[otherProfileId] = onlineUsers.includes(otherProfileId)
      ? setStatus("Online")
      : setStatus("Offline");
  }, [otherProfileId, onlineUsers, setStatus]);

  return (
    <PageHeader>
      <div className="flex items-center gap-4 text-white">
        <div className="flex flex-none items-center gap-3 text-sm font-semibold">
          {type === "server" ? (
            <Hash className="w-5 h-5 text-zinc-400" />
          ) : (
            <UserAvatar size="sm" src={imageUrl} alt="avatar" status={status} />
          )}
          {name}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <PopoverTooltipProvider
          open={open}
          setOpen={setOpen}
          popoverChildren={<></>}
        >
          {iconsArray.map((item, i) => {
            if (i === 0) return null;
            const messageIconIndex = i === 1;
            return (
              <PopoverTooltipContent
                key={i}
                triggerContent={
                  <HybridButton
                    className={cn(
                      "text-gray-300 hover:text-gray-200",
                      messageIconIndex ? "hidden md:block" : null
                    )}
                    href={item.href}
                    key={i}
                  >
                    {item.icon}
                  </HybridButton>
                }
                asChild={messageIconIndex}
                side="bottom"
                orientation="vertical"
                tooltipClassName="z-[51] !text-sm"
                sideOffset={0}
              >
                {item.tooltip}
              </PopoverTooltipContent>
            );
          })}
        </PopoverTooltipProvider>
      </div>
    </PageHeader>
  );
};

export default ChatHeader;
