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
import {
  useAcceptRequestMutation,
  useDeleteRequestMutation,
} from "@/hooks/redux/api/dashboard/friend-request/requestSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FriendDataType } from "@/lib/types";

interface FriendListItemProps {
  tab: FriendsTab;
  friend: FriendDataType;
}

export default function FriendListItem({ friend, tab }: FriendListItemProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [acceptRequest, { isSuccess }] = useAcceptRequestMutation();
  const [deleteRequest] = useDeleteRequestMutation();
  const { conversation } = useSelector((state: RootState) => state.data);

  const handleAcceptFriends = async () => {
    try {
      if (friend.id) {
        await acceptRequest(friend.id);
        if (isSuccess) {
          router.refresh();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeclineFriends = async () => {
    try {
      await deleteRequest(friend.id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddConversation = () => {
    if (conversation !== null) {
      const isFriendAlreadyAdded = conversation?.some(
        (user) => user.id === friend?.id
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
          : `/channels/me/${friend?.profileId ? friend.profileId : friend.id}`
      }
      className={`group justify-between border-t-[1px] border-gray-800 py-2.5 pr-3 `}
      noVerticalPadding
    >
      <div className="flex items-center gap-3">
        <Avatar
          src={friend.imageUrl}
          alt={friend.name}
          className="flex-none"
          status={
            tab.key === FriendsTabEnum.Pending
              ? undefined
              : friend.profile_status
          }
        />
        <div className="flex-1 leading-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-200">
            <span className="font-semibold">{friend?.name}</span>
            <span className="hidden text-xs text-gray-400 group-hover:block">
              {friend.username}
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
            <RoundedButton
              onClick={handleAddConversation}
              tooltipContent="Message"
            >
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
