"use client";

import { useState } from "react";
import { BsPlus } from "react-icons/bs";

import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import ConversationPopover from "./conversation-popover";

const ConversationHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
      <div
          className={cn(
            "flex cursor-default items-center justify-between pl-3 pr-2.5 text-xs font-semibold",
            "align-middle text-gray-400 hover:text-gray-200",
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
        <ConversationPopover setOpen={setOpen} position="left-20" />
      </Popover>
    </TooltipProvider>
  );
};

export default ConversationHeader;