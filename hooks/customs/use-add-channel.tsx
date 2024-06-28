import { Friends } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/hooks/redux/store";
import { setConversation } from "@/hooks/redux/slice-stores/storeSlice";

export const useAddChannel = () => {
  const [selectedFriend, setSelectedFriend] = useState<Friends | null>(
    null
  );

  const { conversation } = useSelector((state: RootState) => state.data);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddChannel = () => {
    if (selectedFriend && conversation !== null) {
      const isFriendAlreadyAdded = conversation.some(
        (channel) => channel.id === selectedFriend.id
      );
      if (!isFriendAlreadyAdded) {
        dispatch(setConversation([selectedFriend, ...conversation]));
      }
      router.push(`/channels/${selectedFriend.id}`);
    }
  };

  return { handleAddChannel, selectedFriend, setSelectedFriend };
};