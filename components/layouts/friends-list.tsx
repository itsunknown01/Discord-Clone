"use client";

import { Users } from "@/lib/mock-data/mock";
import { TooltipProvider } from "../ui/tooltip";
import ListData from "./list-data";
import { useFriendsTabStore } from "@/hooks/customs/use-friends-tab";
import { useFriendStore } from "@/hooks/customs/use-friends-store";
import { useEffect } from "react";
import { FriendsTabEnum, friendsTabsProps } from "@/lib/mock-data/friends";
import { Friends } from "@prisma/client";

interface FriendListProps {
  friends: Friends[];
}

export default function FriendsList({
  friends,
}: FriendListProps) {
  const { currentTab } = useFriendsTabStore();
  const { setFriends } = useFriendStore();

  useEffect(() => {
    if (friends) {
      setFriends(friends);
    }
  }, []);

  const tab = friendsTabsProps[currentTab];
  const isAllOrAvailableTab = [
    FriendsTabEnum.All,
    FriendsTabEnum.Available,
  ].includes(currentTab);

  const friendRequests = friends.filter(friend => friend.status === "Online")
  const blockedFriends = friends.filter(friend => friend.status === "Idle")

  const data = isAllOrAvailableTab
    ? friends
    : currentTab === FriendsTabEnum.Pending
    ? friendRequests
    : blockedFriends;

  return (
    <div className="flex flex-1 flex-col">
      <TooltipProvider>
        <ListData key={currentTab} tab={tab} data={data || []} />
      </TooltipProvider>
    </div>
  );
}
