"use client"

import { User } from "@/lib/mock-data/mock";
import { TooltipProvider } from "../ui/tooltip";
import ListData from "./list-data";
import { useFriendsTabStore } from "@/hooks/customs/use-friends-tab";
import { useFriendStore } from "@/hooks/customs/use-friends-store";
import { useEffect } from "react";
import { FriendsTabEnum, friendsTabsProps } from "@/lib/mock-data/friends";

interface FriendListProps {
  friends: User[];
  friendRequests: User[];
  blockedFriends: User[];
}

export default function FriendsList({
  friends,
  friendRequests,
  blockedFriends,
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
