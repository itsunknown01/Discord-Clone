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

const getData = async (): Promise<{ channels: ListedDMChannel[] }> => {
  const channels: ListedDMChannel[] = generateRandomFakeChannels(MOCK_CHANNELS);
  await delay(MOCK_DELAY);
  return { channels };
};

const ConversationList = () => {
  const params = useParams();
  const {channels, setChannels} = useChannelStore();

  useEffect(() => {
    const fetchChannels = async () => {
      const { channels: fetchedChannels } = await getData();
      setChannels(fetchedChannels);
    };

    fetchChannels();
  }, [setChannels]);

  const handleChannelDelete = (channelId: string) => {
    if (channels !== null) {
      setChannels(channels?.filter((channel) => channel.id !== channelId));
    }
  };

  return (
    <div className="pt-4">
      <ConversationHeader />
      <List className="mt-1">
        {channels?.map((channel) => (
          <ConversationListItem
            active={params.id === channel.id}
            key={channel.id}
            channel={channel}
            onDelete={() => handleChannelDelete(channel.id)}
          />
        ))}
      </List>
    </div>
  );
};

export default ConversationList;
