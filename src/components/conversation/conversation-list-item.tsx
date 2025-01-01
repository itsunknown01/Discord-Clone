"use client";

import { UserStatusType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillChatLeftTextFill, BsX } from "react-icons/bs";
import UserAvatar from "../common/user-avatar";
import { useSocket } from "../providers/socket-provider";
import { ListItem } from "../ui/list";

interface ConversationListItem {
  friend: any;
  active: boolean;
  onDelete: () => void;
  profileId: string;
}

const ConversationListItem = ({
  friend,
  active,
  onDelete,
  profileId,
}: ConversationListItem) => {
  const params = useParams();
  const [status, setStatus] = useState<UserStatusType>("Offline");

  const { onlineUsers } = useSocket();
  
  useEffect(() => {
    const statusMap: { [key: string]: void } = {};

    if (params.conversationId === friend.friendId) {
      statusMap[friend.friendId] = onlineUsers.includes(friend.friendId)
        ? setStatus("Online")
        : setStatus("Offline");
    } else {
      statusMap[friend.profileId] = onlineUsers.includes(friend.profileId)
        ? setStatus("Online")
        : setStatus("Offline");
    }
  }, [
    friend.friendId,
    friend.profileId,
    onlineUsers,
    params.conversationId,
    profileId,
    setStatus,
  ]);

  return (
    <ListItem
      noVerticalPadding
      active={active}
      href={`/channels/me/${friend.profileId === profileId ? friend.friendId : friend.profileId}`}
      className="group gap-3 py-1.5"
    >
      <UserAvatar
        src={friend.profile.imageUrl}
        alt={
          friend.profileId === profileId
            ? friend.profile.name
            : friend.friend.name
        }
        status={status}
        className="w-8 flex-none"
      />
      <div className="flex-1 truncate text-sm">
        {friend.profileId === profileId
          ? friend.friend!.name
          : friend.profile.name}
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
