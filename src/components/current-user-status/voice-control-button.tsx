"use client";

import { ReactNode, useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface VoiceControlButtonProps {
  icon: ReactNode;
  muted?: boolean;
  tooltipText: string;
  onClick?: () => void;
}

export default function VoiceControlButton({
  icon,
  muted,
  tooltipText,
  onClick,
}: VoiceControlButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open}>
      <TooltipTrigger
        asChild
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button
          onClick={onClick}
          className={cn(
            "group relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-700",
            "text-gray-300 hover:text-gray-200"
          )}
        >
          {icon}
          {muted && (
            <div className="absolute h-3/4 w-[2px] rotate-45 rounded-sm border-[1px] border-red-500 bg-red-500 group-hover:border-gray-700"></div>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent className="text-xs font-normal text-gray-200">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
}