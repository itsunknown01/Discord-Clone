"use client";

import { FriendsTabEnum, friendsTabs } from "@/constants/me-page";
import { useTabStore } from "@/hooks/use-tab-store";
import { useMemo } from "react";
import { useSocket } from "../providers/socket-provider";
import { TooltipProvider } from "../ui/tooltip";
import MeFriendsContentItem from "./me-friends-content-item";

interface FriendListProps {
  friends: any[];
  friendRequests: any[];
  users: any[];
}

const MeFriendsContent = ({
  friends,
  friendRequests,
  users,
}: FriendListProps) => {
  const { currentTab } = useTabStore();
  const { onlineUsers } = useSocket();

  const blockedFriends = friends.filter(
    (friend) => friend.profile_status === "Blocked"
  );
  const data = useMemo(
    () =>
      currentTab === FriendsTabEnum.All
        ? friends.map((friend) => ({ ...friend, status: "Offline" }))
        : currentTab === FriendsTabEnum.Online
          ? friends
              .filter((friend) => onlineUsers.includes(friend.profileId))
              .map((friend) => ({
                ...friend,
                status: "Online",
              }))
          : currentTab === FriendsTabEnum.Pending
            ? friendRequests
            : currentTab === FriendsTabEnum.AddFriend
              ? users
              : blockedFriends,
    [blockedFriends, friends, friendRequests, currentTab, users, onlineUsers]
  );

  return (
    <div className="flex flex-1 flex-col">
      <TooltipProvider>
        {friendsTabs.map((tab) => (
          <MeFriendsContentItem key={tab.id} tab={tab} data={data} />
        ))}
      </TooltipProvider>
    </div>
  );
};

export default MeFriendsContent;
