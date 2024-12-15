"use client";

import { cn } from "@/lib/utils";
import { Profile } from "@/types";
import { ReactNode, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import {
    BsChatRightFill,
    BsGithub,
    BsInboxFill
} from "react-icons/bs";
import {
    PopoverTooltipContent,
    PopoverTooltipProvider,
} from "../feature/popover-tooltip";
import HybridButton from "../ui/hybrid-button";
import { PageHeader } from "../ui/page";

const headerIcons = [
  {
    icon: <BiSolidPhoneCall size={20} />,
    tooltip: "Start a voice call",
    href: "",
  },
  {
    icon: <BsChatRightFill size={18} />,
    tooltip: "Create  private Message",
    href: "",
  },
  { icon: <BsInboxFill size={20} />, tooltip: "Inbox", href: "" },
  {
    icon: <BsGithub size={20} />,
    href: "https://github.com/igorm84/rediscord",
    tooltip: "Author github",
  },
];

interface MeHeaderProps {
  user?: Profile;
  children?: ReactNode
}

const MeHeader = ({ user,children }: MeHeaderProps) => {
  const [open, setOpen] = useState(false);
  return (
    <PageHeader>
      {children}
      <div className="flex items-center gap-6">
        <PopoverTooltipProvider
          open={open}
          setOpen={setOpen}
          popoverChildren={<></>}
        >
          {headerIcons.map((item, i) => {
            if (i === 0 && !user) return null;
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
                isSeparator={messageIconIndex}
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

export default MeHeader;
