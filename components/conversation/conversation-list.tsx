"use client";

import {
  ListedDMChannel,
  MOCK_CHANNELS,
  MOCK_DELAY,
  delay,
  generateRandomFakeChannels,
} from "@/lib/mock-data/mock";
import { useEffect, useState } from "react";
import { List } from "../ui/list";
import ConversationHeader from "./conversation-header";
import ConversationListItem from "./conversation-list-item";
import { useParams } from "next/navigation";
import { useChannelStore } from "@/hooks/customs/use-channel-store";
import { Friends } from "@prisma/client";

const getData = async (): Promise<{ channels: ListedDMChannel[] }> => {
  const channels: ListedDMChannel[] = generateRandomFakeChannels(MOCK_CHANNELS);
  await delay(MOCK_DELAY);
  return { channels };
};

interface ConversationListProps {
  friends: Friends[];
}

const ConversationList = ({ friends }: ConversationListProps) => {
  const params = useParams();
  const [friendsList,setFriendsList] = useState<Friends[]>([])

  useEffect(() => {
    if(friends) {
      setFriendsList(friends)
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
            active={params.id === friend.id}
            key={friend.id}
            friend={friend}
            onDelete={() => handleFriendDelete(friend.id)}
          />
        ))}
      </List>
    </div>
  );
};

export default ConversationList;
