"use client";

import { FriendsTab, FriendsTabEnum } from "@/lib/friends";
import { useState } from "react";
import { ListItem } from "@/components/ui/list";
import Avatar from "@/components/ui/avatar";
import {
  BsChatLeftFill,
  BsCheck2,
  BsThreeDotsVertical,
  BsX,
} from "react-icons/bs";
import RoundedButton from "@/components/ui/rounded-button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { setConversation } from "@/hooks/redux/slice-stores/storeSlice";

interface FriendListItemProps {
  tab: FriendsTab;
  friend: any;
}

export default function FriendListItem({ friend, tab }: FriendListItemProps) {
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequest, setFriendRequests] = useState<any[]>([]);

  const dispatch = useDispatch()

  const { conversation } = useSelector((state: RootState) => state.data);

  const handleAcceptFriends = () => {
    if (friends !== null && friendRequest !== null) {
      setFriendRequests(
        friendRequest?.filter((item) => item.id !== friend?.id)
      );
      setFriends([...friends, friend]);
    }
  };

  const handleDeclineFriends = () => {
    if (friendRequest !== null) {
      setFriendRequests(friendRequest.filter((item) => item.id !== friend?.id));
    }
  };
  const handleAddChannel = () => {
    if (conversation !== null) {
      const isFriendAlreadyAdded = conversation?.some(
        (channel) => channel.id === friend?.id
      );
      if (!isFriendAlreadyAdded) {
        dispatch(setConversation([friend, ...conversation]));
      }
    }
  };

  return (
    <ListItem
      href={
        tab.key === FriendsTabEnum.Pending
          ? ""
          : `/channels/me/${friend.profile.id}`
      }
      className={`group justify-between border-t-[1px] border-gray-800 py-2.5 pr-3 `}
      noVerticalPadding
    >
      <div className="flex items-center gap-3">
        <Avatar
          src={
            tab.key === FriendsTabEnum.Pending
              ? friend.sender.imageUrl
              : friend.profile.imageUrl
          }
          alt={friend.name}
          className="flex-none"
          status={
            tab.key === FriendsTabEnum.Pending ? undefined : friend.status
          }
        />
        <div className="flex-1 leading-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-200">
            <span className="font-semibold">
              {tab.key === FriendsTabEnum.Pending
                ? friend.sender?.name
                : friend?.profile.name}
            </span>
            <span className="hidden text-xs text-gray-400 group-hover:block">
              {tab.key === FriendsTabEnum.Pending
                ? friend.sender?.username
                : friend?.profile.username}
            </span>
          </div>
          <div className="text-[13px] text-gray-300">
            {tab.key === FriendsTabEnum.Pending
              ? "Incoming Friend Request"
              : `${friend.status}`}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        {tab.key === FriendsTabEnum.Pending ? (
          <>
            <RoundedButton
              className="!p-1.5"
              onClick={handleAcceptFriends}
              tooltipContent="Accept"
            >
              <BsCheck2 size={23} />
            </RoundedButton>
            <RoundedButton
              onClick={handleDeclineFriends}
              className="!p-1.5"
              tooltipContent="Decline"
            >
              <BsX size={23} />
            </RoundedButton>
          </>
        ) : (
          <>
            <RoundedButton onClick={handleAddChannel} tooltipContent="Message">
              <BsChatLeftFill />
            </RoundedButton>
            <RoundedButton tooltipContent="More">
              <BsThreeDotsVertical />
            </RoundedButton>
          </>
        )}
      </div>
    </ListItem>
  );
}
