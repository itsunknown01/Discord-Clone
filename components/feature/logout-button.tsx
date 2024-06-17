"use client";

import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ redirect: false });
    router.push("/login");
  };
  return (
    <button
      className={cn("group flex items-center mx-auto my-2.5")}
      onClick={handleSignOut}
    >
      <div className="flex mx-3 h-12 w-12 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
        <LogOut className="group-hover:text-white text-emerald-500" size={25} />
      </div>
    </button>
  );
}
