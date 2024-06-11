"use client";

import { Plus } from "lucide-react";
import React from "react";
import ActionTooltip from "@/components/feature/action-tooltip";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/customs/use-modal";

const NavigationAction = ({ className }: { className?: string }) => {
  const { onOpen } = useModal();

  return (
    <ActionTooltip side="right" align="center" label="Add a server">
      <button
        className={cn("group flex items-center", className)}
        onClick={() => onOpen("createServer")}
      >
        <div className="flex mx-3 h-12 w-12 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
          <Plus className="group-hover:text-white text-emerald-500" size={25} />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationAction;
