"use client";

import Badge from "@/components/ui/badge";
import { TabGroup, TabGroupButton } from "@/components/ui/tab-group";
import { setCurrentTab } from "@/hooks/redux/slice-stores/storeSlice";
import { RootState } from "@/hooks/redux/store";
import { FriendsTabEnum, friendsTabsProps } from "@/lib/friends";
import { useDispatch, useSelector } from "react-redux";

interface FriendsTabsProps {
  count: number;
}

export default function FriendsTabs({ count }: FriendsTabsProps) {
  const PendingBadge = <Badge className="ml-1" count={count} />;

  const { currentTab } = useSelector((state: RootState) => state.data);

  const dispatch = useDispatch();
  return (
    <TabGroup>
      {Object.values(friendsTabsProps).map((item) => (
        <TabGroupButton
          active={currentTab == item.key}
          onClick={() => dispatch(setCurrentTab(item.key))}
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
