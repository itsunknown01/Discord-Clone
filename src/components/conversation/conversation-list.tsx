"use client";

import React from "react";
import { useParams } from "next/navigation";

import ConversationHeader from "./conversation-header";
import { List } from "../ui/list";
import ConversationListItem from "./conversation-list-item";

const ConversationList = ({ friends }: { friends: Array<any> }) => {
  const params = useParams();

  return (
    <div className="pt-2">
      <ConversationHeader friends={friends} />
      <List className="my-1 px-2">
        {friends.map((friend) => (
          <ConversationListItem
            key={friend.id}
            active={params.conversationId === friend.id}
            friend={friend}
            onDelete={() => {}}
          />
        ))}
      </List>
    </div>
  );
};

export default ConversationList;
