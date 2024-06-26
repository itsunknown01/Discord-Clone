"use client"

import { Friends } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { List } from "@/components/ui/list";
import ConversationHeader from "@/components/conversation/conversation-header";
import ConversationListItem from "@/components/conversation/conversation-list-item";

interface ConversationListProps {
    friends: Friends[];
}

export default function ConversationList({ friends }: ConversationListProps) {
    const params = useParams();
    const [friendsList, setFriendsList] = useState<Friends[]>([]);
  
    useEffect(() => {
      if (friends) {
        setFriendsList(friends);
      }
    }, [friends]);
  
    const handleFriendDelete = (friendId: string) => {
      if (friendsList !== null) {
        setFriendsList(friendsList?.filter((friend) => friend.id !== friendId));
      }
    };
  
    return (
      <div className="pt-4">
        <ConversationHeader friends={friends} />
        <List className="mt-1">
          {friendsList?.map((friend) => (
            <ConversationListItem
            key={friend.id}
              active={params?.id === friend.id}
              friend={friend}
              onDelete={() => handleFriendDelete(friend.id)}
            />
          ))}
        </List>
      </div>
    );
  };