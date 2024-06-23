"use client";

import { useEffect, useState } from "react";
import NavigationMenuItem from "./navigation-item";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavigationSidebar() {
  const [active, setActive] = useState("default");

  const params = useParams();

  useEffect(() => {
    if (params.serverId) setActive(params.serverId as string);
  }, [params.serverId]);

  return (
    <nav className="flex flex-col items-center h-screen w-full space-y-4 mt-2 text-primary">
      <div className="flex items-center justify-center bg-[#1E1F22]">
        <NavigationMenuItem
          href={"/channels/me"}
          onClick={() => setActive("default")}
          label="Direct Message"
          notificationCount={2}
          className={cn(
            "mx-auto mb-2",
            active === "default" ? "bg-blue-500 text-white" : "text-gray-500"
          )}
          isActive={active === "default"}
        />
      </div>
      Navigation Sidebar
    </nav>
  );
}
