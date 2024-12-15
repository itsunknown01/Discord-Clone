"use client";

import ActionTooltip from "@/components/feature/action-tooltip";
import { useModalStore } from "@/hooks/use-modal-store";
// import { useModalStore } from "@/hooks/store/use-modal-store";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const NavigationAction = ({ className }: { className?: string }) => {
  const { onOpen } = useModalStore();
  const handleClick = () => onOpen("createServer");
  
  return (
    <ActionTooltip side="right" align="center" label="Add a server">
      <button
        className={cn("group flex items-center", className)}
        onClick={handleClick}
      >
        {/* <div
          className={cn(
            "absolute -left-4 w-2 rounded-lg bg-white",
            "transition-all group-hover:scale-100",
            "hover:bottom-1 hover:top-1 top-1/2 -mt-3 h-6 scale-0"
          )}
        /> */}
        <div className="flex mx-3 h-12 w-12 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-zinc-700/50 dark:bg-background group-hover:bg-emerald-500">
          <Plus className="group-hover:text-white text-emerald-500" size={25} />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationAction;
