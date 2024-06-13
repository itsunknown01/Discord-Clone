"use client";

import {cn} from "@/lib/utils";
import HybridButton, { HybridButtonProps } from "./hybrid-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

type RoundedButtonProps = HybridButtonProps & {
  tooltipContent?: React.ReactNode;
};

export default function RoundedButton({
  className,
  tooltipContent,
  ...props
}: RoundedButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HybridButton
          className={cn(
            "rounded-full bg-midground p-2.5 hover:bg-background",
            "text-gray-400 hover:text-gray-100",
            className,
          )}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent className="text-xs">{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
