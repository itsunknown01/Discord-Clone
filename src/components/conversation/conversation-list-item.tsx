"use client";

import React from "react";
import { ListItem } from "../ui/list";
import UserAvatar from "../common/user-avatar";
import { UserStatus } from "@/types";
import { BsFillChatLeftTextFill, BsX } from "react-icons/bs";

interface ConversationListItem {
  friend: any;
  active: boolean;
  onDelete: () => void;
}

const ConversationListItem = ({
  friend,
  active,
  onDelete,
}: ConversationListItem) => {
  const isOnline = false;
  return (
    <ListItem
      noVerticalPadding
      active={active}
      href={`/channels/me/${friend.id}`}
      className="group gap-3 py-1.5"
    >
      <UserAvatar
        src={friend.profile.imageUrl}
        alt={friend.name}
        status={isOnline ? UserStatus.Online : UserStatus.Offline}
        className="w-8 flex-none"
      />
      <div className="flex-1 truncate text-sm">
        {friend.profile.name}
        {friend.activity && (
          <div className="h-4 truncate text-xs leading-3">
            <span className="capitalize">{friend.activity?.type}</span>
            {friend.activity?.name}
            <BsFillChatLeftTextFill
              fontSize={10}
              className="ml-0.5 inline-block"
            />
          </div>
        )}
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          onDelete();
        }}
        className="hidden text-gray-300 hover:text-white group-hover:block"
      >
        <BsX fontSize={24} />
      </button>
    </ListItem>
  );
};

export default ConversationListItem;
