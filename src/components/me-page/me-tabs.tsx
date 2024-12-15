import React from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { FriendsTabEnum, friendsTabs } from "@/constants/me-page";
import { cn } from "@/lib/utils";
import BadgeCount from "../common/badge-count";

const MeTabs = ({ count }: { count: number }) => {
  const PendingBadge = <BadgeCount className="ml-1" count={count} />;

  const currentTab: FriendsTabEnum = FriendsTabEnum.Online;

  return (
    <TabsList className="bg-inherit gap-4">
      {friendsTabs.map((tab) => (
        <TabsTrigger
          key={tab.id}
          value={tab.id}
          className={cn(
            "rounded px-2 py-0.5 text-sm hover:bg-zinc-800/80",
            "active:bg-zinc-700/50 active:text-gray-100",
            currentTab == tab.id
              ? "cursor-default bg-zinc-800/50 text-gray-100"
              : "text-gray-300 hover:text-gray-100",
            tab.id === FriendsTabEnum.AddFriend
              ? "rounded-lg bg-green-700 px-2 py-0.5 text-sm font-semibold !text-gray-100 hover:bg-green-800"
              : ""
          )}
        >
          {tab.name || tab.title}
          {tab.id === FriendsTabEnum.Pending && PendingBadge}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default MeTabs;
