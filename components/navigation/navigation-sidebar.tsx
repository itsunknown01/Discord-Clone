"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import SidebarMenuItem from "@/components/navigation/navigation-menu-item";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationAction from "./naviagation-action";
import { ListedServer } from "@/lib/mock-data/mock";
import { Channel } from "@/lib/mock-data/channel";

interface NavigationSidebarProps {
  servers: ListedServer[];
  channels: Channel[]
}

const NavigationSidebar = ({ servers,channels }: NavigationSidebarProps) => {
  const [active, setActive] = useState<string>("default");

  const initialChannel = channels[0]

  return (
    <div className="flex flex-col items-center h-full w-full space-y-4 mt-2 text-primary">
      <SidebarMenuItem
        href={`/channels/me`}
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
        {servers.map((server) => (
          <SidebarMenuItem
            href={`/channels/${server.id}/${initialChannel.id}`}
            onClick={() => setActive(server.id)}
            label={server.name}
            notificationCount={1}
            className="mx-auto mb-4"
            image={{
              url: server.photo,
              alt: "server name",
            }}
            isActive={active === server.id}
            key={server.id}
          />
        ))}
        <NavigationAction className="mx-auto my-2.5" />
      </ScrollArea>
    </div>
  );
};

export default NavigationSidebar;
