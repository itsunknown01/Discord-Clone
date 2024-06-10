"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import SidebarMenuItem from "../conversation/sidebar-menu-item";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

const NavigationSidebar = () => {
  const [active, setActive] = useState<string>("default");

  return (
    <div className="flex flex-col items-center h-full w-full space-y-4 mt-2 text-primary">
      <SidebarMenuItem
        href={`/channels/@me`}
        onClick={() => setActive("default")}
        label="Direct Message"
        notificationCount={2}
        className={cn(
          "mx-auto mb-2 flex items-center justify-center bg-foreground",
          active === "default" ? "bg-blue-500 text-white" : "text-gray-500"
        )}
        isActive={active === "default"}
      />

      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        <SidebarMenuItem
          href={`/channels/1`}
          onClick={() => setActive("1")}
          label="server 1"
          notificationCount={1}
          className="mx-auto my-2"
          image={{
            url: "/discord-image.jpg",
            alt: "server 1"
          }}
          isActive={active === "1"}
        />
      </ScrollArea>
    </div>
  );
};

export default NavigationSidebar;
