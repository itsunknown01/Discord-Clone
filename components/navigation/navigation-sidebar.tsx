"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Server } from "@prisma/client";

import NavigationMenuItem from "@/components/navigation/navigation-item";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationAction from "@/components/navigation/naviagation-action";
import LogOutButton from "@/components/feature/logout-button";

export default function NavigationSidebar({ servers }: { servers: Server[] }) {
  const [active, setActive] = useState("default");

  const params = useParams();

  useEffect(() => {
    if (params?.serverId) setActive(params?.serverId as string);
  }, [params?.serverId]);

  return (
    <nav className="flex flex-col items-center h-screen w-full space-y-4 mt-2 text-primary">
      <div className="flex items-center justify-center bg-[#1E1F22]">
        <NavigationMenuItem
          href={"/channels/me"}
          onClick={() => setActive("default")}
          label="Direct Message"
          notificationCount={2}
          className={cn(
            "mx-auto mb-1",
            active === "default" ? "bg-blue-500 text-white" : "text-gray-500"
          )}
          isActive={active === "default"}
        />
      </div>

      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full h-full">
        {servers.map((server) => (
          <NavigationMenuItem
            key={server.id}
            href={`/channels/${server.id}`}
            onClick={() => setActive(server.id)}
            label={server.name}
            notificationCount={3}
            className="mx-auto mb-4"
            isActive={active === server.id}
            image={{
              url: server.imageUrl,
              alt: server.name,
            }}
          />
        ))}
        <NavigationAction className="mx-auto mb-1.5" />
        <LogOutButton />
      </ScrollArea>
    </nav>
  );
}
