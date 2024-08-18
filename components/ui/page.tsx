"use client";

import { Friends } from "@prisma/client";
import * as React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { BsChatRightFill, BsGithub, BsInboxFill } from "react-icons/bs";

import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import HybridButton, {
  HybridButtonProps,
  HybridButtonRef,
} from "@/components/ui/hybrid-button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import ConversationPopover from "@/components/conversation/conversation-popover";

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

const Page = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col bg-zinc-700 shadow-lg shadow-zinc-700/5 h-screen",
      className
    )}
    {...props}
  />
));

Page.displayName = "Page";

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
  children: React.ReactNode
  user?: Friends | null;
  handleAudioCall?: () => void;
  showAudioVideoCall?: boolean;
}

const PageHeader = ({
  children,
  user,
  handleAudioCall,
  showAudioVideoCall,
}: PageHeaderProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Header
      className={`flex-none justify-between ${
        showAudioVideoCall ? "text-[#000000]" : ""
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
                      orientation="vertical"
                      className={`h-4 mt-1 bg-white ${
                        messageIconIndex ? "hidden md:block" : null
                      }`}
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

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "md" | "lg";
}

const PageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ padding, className, ...props }: PageContentProps, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-1 lg:overflow-hidden",
      padding === "md" && "px-6 pt-4",
      padding === "lg" && "px-8 pt-6",
      className
    )}
    {...props}
  />
));

PageContent.displayName = "PageContent";

export { Page, PageContent, PageHeader, PageHeaderButton };
