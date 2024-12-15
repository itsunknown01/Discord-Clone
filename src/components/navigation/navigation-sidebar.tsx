"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import NavigationMenuItem from './navigation-menu-item';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Server } from '@/types';
import NavigationAction from './navigation-action';
import LogOutButton from './logout-button';

const NavigationSidebar = ( {servers }: { servers: Server[] }) => {
    const [active, setActive] = useState("default");

    const params = useParams();
  
    useEffect(() => {
      if (params?.serverId) setActive(params?.serverId as string);
    }, [params?.serverId]);
  
    return (
      <nav className="flex flex-col items-center h-screen w-full space-y-3 mt-3 text-primary">
        <div className="flex items-center justify-center">
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
          <NavigationAction className="mb-1.5" />
          <LogOutButton />
        </ScrollArea>
      </nav>
    );
}

export default NavigationSidebar