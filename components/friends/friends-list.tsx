"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FriendsListData from "@/components/friends/friends-list-data";
import { TooltipProvider } from "@/components/ui/tooltip";
import { setFriends } from "@/hooks/redux/slice-stores/storeSlice";
import { RootState } from "@/hooks/redux/store";
import { FriendsTabEnum, friendsTabsProps } from "@/lib/friends";
import { FriendsType } from "@/lib/types";

interface FriendListProps {
  friends: FriendsType[];
  friendRequests: any[];
}

export default function FriendsList({
  friends,
  friendRequests,
}: FriendListProps) {
  const { currentTab } = useSelector((state: RootState) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (friends) {
      dispatch(setFriends(friends));
    }
  }, [friends, dispatch]);

  const tab = friendsTabsProps[currentTab];
  const isAllOrAvailableTab = [
    FriendsTabEnum.All,
    FriendsTabEnum.Available,
  ].includes(currentTab);

  const blockedFriends = friends.filter(
    (friend) => friend.status === "Blocked"
  );

  const data = isAllOrAvailableTab
    ? friends
    : currentTab === FriendsTabEnum.Pending
    ? friendRequests
    : blockedFriends;

  return (
    <div className="flex flex-1 flex-col">
      <TooltipProvider>
        <FriendsListData
          key={currentTab}
          tab={tab}
          data={data || []}
        />
      </TooltipProvider>
    </div>
  );
}
