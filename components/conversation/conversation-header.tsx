"use client";

import { useState } from "react";
import { BsPlus } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import ConversationPopover from "@/components/conversation/conversation-popover";

interface ConversationHeaderProps {
  friends: any[];
}

export default function ConversationHeader({
  friends,
}: ConversationHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <div
          className={cn(
            "flex cursor-default items-center justify-between pl-3 pr-2.5 text-xs font-semibold",
            "align-middle text-gray-400 hover:text-gray-200"
          )}
        >
          DIRECT MESSAGES
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button className="text-gray-300">
                  <BsPlus fontSize={22} />
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent className="font-normal text-gray-200">
              Create DM
            </TooltipContent>
          </Tooltip>
        </div>
        <ConversationPopover
          setOpen={setOpen}
          position="left-20"
          friends={friends}
        />
      </Popover>
    </TooltipProvider>
  );
}
