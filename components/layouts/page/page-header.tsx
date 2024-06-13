"use client";

import ConversationPopover from "@/components/conversation/conversation-popover";
import Header from "@/components/ui/header";
import HybridButton, {
  HybridButtonProps,
  HybridButtonRef,
} from "@/components/ui/hybrid-button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@/lib/mock-data/mock";
import { cn } from "@/lib/utils";
import React, { ReactNode, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsChatRightFill, BsGithub, BsInboxFill } from "react-icons/bs";

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

type PageHeaderButtonProps = HybridButtonProps;

const PageHeaderButton = React.forwardRef(
  (
    { children, className, ...props }: PageHeaderButtonProps,
    ref: React.Ref<HybridButtonRef>
  ) => (
    <HybridButton
      ref={ref}
      className={cn("text-gray-300 hover:text-gray-200", className)}
      {...props}
    >
      {children}
    </HybridButton>
  )
);

PageHeaderButton.displayName = "PageHeadeButton";

interface PageHeaderProps {
  children: ReactNode;
  user?: User;
  handleAudioCall?: () => void;
  showAudioVideoCall?: boolean;
}

const PageHeader = ({
  children,
  user,
  showAudioVideoCall,
  handleAudioCall,
}: PageHeaderProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Header
      className={`flex-none justify-between ${
        showAudioVideoCall ? "bg-[#000000]" : ""
      } transition-colors duration-200 ease-in-out `}
    >
      {children}
      <div className="flex items-center gap-6">
        <TooltipProvider>
          <Popover open={open} onOpenChange={setOpen}>
            {headerIcons.map((item, index) => {
              if (index === 0 && !user) {
                return null;
              }

              const messageIconIndex = index === 1;

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild={messageIconIndex}>
                      <PageHeaderButton
                        onClick={index === 0 ? handleAudioCall : undefined}
                        className={`${
                          messageIconIndex ? "hidden md:block" : null
                        }`}
                        href={item.href}
                        key={index}
                      >
                        {item.icon}
                      </PageHeaderButton>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  {messageIconIndex && (
                    <Separator
                      className={`${
                        messageIconIndex ? "hidden md:block" : null
                      }`}
                      orientation="vertical"
                    />
                  )}
                  <TooltipContent
                    side="bottom"
                    className="z-[51] !text-sm"
                    sideOffset={0}
                  >
                    {item.tooltip}
                  </TooltipContent>
                </Tooltip>
              );
            })}
            <ConversationPopover setOpen={setOpen} position="right-20" />
          </Popover>
        </TooltipProvider>
      </div>
    </Header>
  );
};

export default PageHeader;
