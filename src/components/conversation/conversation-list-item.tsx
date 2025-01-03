"use client";

import { UserStatusType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillChatLeftTextFill, BsX } from "react-icons/bs";
import UserAvatar from "../common/user-avatar";
import { useSocket } from "../providers/socket-provider";
import { ListItem } from "../ui/list";

interface ConversationListItem {
  item: any;
  active: boolean;
  onDelete: () => void;
  profileId: string;
}

const ConversationListItem = ({
  item,
  active,
  onDelete,
}: ConversationListItem) => {
  const params = useParams();
  const { onlineUsers } = useSocket();

  const [status, setStatus] = useState<UserStatusType>("Offline");

  const { profile1, profile2 } = item;

  const friend = profile1.id !== params.conversationId ? profile2 : profile1;

  useEffect(() => {
    const statusMap: { [key: string]: void } = {};

    statusMap[friend.id] = onlineUsers.includes(friend.id)
      ? setStatus("Online")
      : setStatus("Offline");
  }, [friend.id, onlineUsers, setStatus]);

  return (
    <ListItem
      noVerticalPadding
      active={active}
      href={`/channels/me/${friend.id}`}
      className="group gap-3 py-1.5"
    >
      <UserAvatar
        src={friend.imageUrl}
        alt={
         friend.name}
        status={status}
        className="w-8 flex-none"
      />
      <div className="flex-1 truncate text-sm">
        {friend!.name}
        {/* {friend.activity && (
          <div className="h-4 truncate text-xs leading-3">
            <span className="capitalize">{friend.activity?.type}</span>
            {friend.activity?.name}
            <BsFillChatLeftTextFill
              fontSize={10}
              className="ml-0.5 inline-block"
            />
          </div>
        )} */}
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
