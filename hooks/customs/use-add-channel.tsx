import { useRouter } from "next/navigation";
import React from "react";
import { useChannelStore } from "./use-channel-store";
import { User } from "@/lib/mock-data/mock";

export const useAddChannel = () => {
  const [selectedFriend, setSelectedFriend] = React.useState<User | null>(null);
  const { channels, setChannels } = useChannelStore();
  const router = useRouter();

  const handleAddChannel = () => {
    if (selectedFriend && channels !== null) {
      const isFriendAlreadyAdded = channels.some(
        (channel) => channel.id === selectedFriend.id,
      );
      if (!isFriendAlreadyAdded) {
        setChannels([selectedFriend, ...channels]);
      }
      router.push(`/channels/${selectedFriend.id}`);
    }
  };

  return { handleAddChannel, selectedFriend, setSelectedFriend };
};
