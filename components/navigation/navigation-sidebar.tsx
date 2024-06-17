"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import SidebarMenuItem from "@/components/navigation/navigation-menu-item";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationAction from "./naviagation-action";
import { ListedServer } from "@/lib/mock-data/mock";
import { Channel } from "@/lib/mock-data/channel";
import { Server } from "@prisma/client";
import { useParams } from "next/navigation";
import LogOutButton from "../feature/logout-button";

interface NavigationSidebarProps {
  servers: Server[];
}

const NavigationSidebar = ({ servers }: NavigationSidebarProps) => {
  const [active, setActive] = useState<string>("default");

  const params = useParams();

  useEffect(() => {
    if (params.serverId) {
      setActive(params.serverId as string);
    }
  },[params.serverId])

  return (
    <div className="flex flex-col items-center h-screen w-full space-y-4 mt-2 text-primary">
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
            href={`/channels/${server.id}`}
            onClick={() => setActive(server.id)}
            label={server.name}
            notificationCount={1}
            className="mx-auto mb-4"
            image={{
              url: server.imageUrl,
              alt: "server name",
            }}
            isActive={active === server.id}
            key={server.id}
          />
        ))}
        <NavigationAction className="mx-auto my-2.5" />
        <LogOutButton />
      </ScrollArea>
    </div>
  );
};

export default NavigationSidebar;