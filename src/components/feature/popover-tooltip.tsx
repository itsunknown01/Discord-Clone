import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Separator } from "../ui/separator";

interface PopoverTooltipProviderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
  popoverChildren: ReactNode;
  popoverClassName?: string;
}

const PopoverTooltipProvider = ({
  open,
  setOpen,
  children,
  popoverClassName,
  popoverChildren,
}: PopoverTooltipProviderProps) => {
  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        {children}
        <PopoverContent className={popoverClassName}>
          {popoverChildren}
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

interface PopoverTooltipContentProps {
  tooltipClassName?: string;
  triggerContent: ReactNode;
  children: ReactNode;
  asChild?: boolean;
  isSeparator?: boolean;
  orientation?: "horizontal" | "vertical" | undefined;
  side?: "bottom" | "top" | "right" | "left" | undefined;
  sideOffset?: number | undefined;
}

const PopoverTooltipContent = ({
  asChild = false,
  isSeparator = false,
  tooltipClassName,
  triggerContent,
  children,
  orientation,
  side,
  sideOffset,
}: PopoverTooltipContentProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <PopoverTrigger asChild={asChild}>{triggerContent}</PopoverTrigger>
      </TooltipTrigger>
      {isSeparator && (
        <Separator
          orientation={orientation}
          className={`h-4 mt-1 bg-white ${
            isSeparator ? "hidden md:block" : null
          }`}
        />
      )}
      <TooltipContent
        className={tooltipClassName}
        side={side}
        sideOffset={sideOffset}
      >
        {children}
      </TooltipContent>
    </Tooltip>
  );
};

export { PopoverTooltipProvider, PopoverTooltipContent };
