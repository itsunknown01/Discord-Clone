"use client";

import ActionTooltip from "@/components/feature/action-tooltip";
import { useModalStore } from "@/hooks/store/use-modal-store";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const NavigationAction = ({ className }: { className?: string }) => {
  const { onOpen } = useModalStore();
  const handleClick = () => {
    onOpen("createServer")
    console.log('clicked')
  }

  return (
    <ActionTooltip side="right" align="center" label="Add a server">
      <button
        className={cn("group flex items-center", className)}
        onClick={handleClick}
      >
        <div className="flex mx-3 h-12 w-12 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
          <Plus className="group-hover:text-white text-emerald-500" size={25} />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationAction;