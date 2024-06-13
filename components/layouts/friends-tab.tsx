"use client";

import { FriendsTabEnum, friendsTabsProps } from "@/lib/mock-data/friends";
import { TabGroup, TabGroupButton } from "../ui/tab-group";
import Badge from "../ui/badge";
import { useState } from "react";

export default function FriendsTabs() {
  const PendingBadge = <Badge className="ml-1" count={2} />;
  const [currentTab, setCurrentTab] = useState<FriendsTabEnum>(
    FriendsTabEnum.Available
  );
  return (
    <TabGroup>
      {Object.values(friendsTabsProps).map((item) => (
        <TabGroupButton
          active={currentTab == item.key}
          onClick={() => setCurrentTab(item.key)}
          key={item.key}
          className={`${
            item.key === FriendsTabEnum.AddFriend
              ? "rounded-lg bg-green-700 px-2 py-0.5 text-sm font-semibold !text-gray-100 hover:bg-green-800"
              : ""
          }`}
        >
          {item.name || item.title}
          {item.key === FriendsTabEnum.Pending && PendingBadge}
        </TabGroupButton>
      ))}
    </TabGroup>
  );
}
