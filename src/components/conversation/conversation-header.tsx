import { cn } from "@/lib/utils";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import {
  PopoverTooltipContent,
  PopoverTooltipProvider,
} from "../feature/popover-tooltip";

const ConversationHeader = ({friends}: {friends: any[]}) => {
  const [open, setOpen] = useState(false);
  return (
    <PopoverTooltipProvider
      open={open}
      setOpen={setOpen}
      popoverChildren={<></>}
    >
      <div
        className={cn(
          "flex cursor-default items-center justify-between pl-3 pr-2.5 text-xs font-semibold",
          "align-middle text-gray-400 hover:text-gray-200"
        )}
      >
        DIRECT MESSAGES
        <PopoverTooltipContent
          triggerContent={
            <button className="text-gray-300">
              <BsPlus fontSize={22} />
            </button>
          }
          tooltipClassName="font-normal text-gray-400"
          asChild
        >
          Create DM
        </PopoverTooltipContent>
      </div>
    </PopoverTooltipProvider>
  );
};

export default ConversationHeader;
