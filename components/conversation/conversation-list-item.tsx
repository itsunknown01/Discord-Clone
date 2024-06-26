"use client";

import { BsFillChatLeftTextFill, BsX } from "react-icons/bs";
import Avatar from "@/components/ui/avatar";
import { ListItem } from "@/components/ui/list";

interface ConversationListItemProps {
  active?: boolean;
  friend: any;
  onDelete: () => void;
}

export default function ConversationListItem({
  friend,
  active,
  onDelete,
}: ConversationListItemProps) {
  return (
    <ListItem
      noVerticalPadding
      active={active}
      href={`/channels/me/${friend.profile.id}`}
      className="group gap-3 py-1.5"
    >
      <Avatar
        src={friend.profile?.imageUrl}
        alt={friend.profile?.name}
        status={friend.status}
        className="w-8 flex-none"
      />
      <div className="flex-1 truncate text-sm">
        {friend.profile.name}
        {friend.activity && (
          <div className="h-4 truncate text-xs leading-3">
            <span className="capitalize">{friend.activity?.type}</span>{" "}
            {friend.activity?.name}{" "}
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
}
