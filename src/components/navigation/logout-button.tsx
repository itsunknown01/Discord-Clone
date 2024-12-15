"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import ActionTooltip from "../feature/action-tooltip";
// import { signOut } from "next-auth/react";

export default function LogOutButton() {
  const router = useRouter();
  const handleSignOut = () => {
    // signOut({ redirect: true });
    router.push("/login");
  };
  return (
    <ActionTooltip align="center" side="left" label="LogOut">
      <button
        className={cn("group flex items-center my-2.5")}
        onClick={handleSignOut}
      >
        <div className="flex mx-3 h-12 w-12 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-zinc-700/50 dark:bg-background group-hover:bg-emerald-500">
          <LogOut
            className="group-hover:text-white text-emerald-500"
            size={25}
          />
        </div>
      </button>
    </ActionTooltip>
  );
}