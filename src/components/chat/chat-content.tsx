"use client";

import React, { useEffect, useState } from "react";
import { isSameDay } from "date-fns";
import { PageContent } from "../ui/page";
import { ChatUserInfo } from "./chat-userInfo";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";
import { Profile } from "@prisma/client";
import { useSocket } from "../providers/socket-provider";

interface ChatContentProps {
  otherUser: Profile;
  currentUser: Profile | undefined | null;
  isChannel?: boolean;
}

const ChatContent = ({
  otherUser,
  currentUser,
  isChannel,
}: ChatContentProps) => {
  const { socket } = useSocket();

  const [messages, setMessages] = useState<any[]>([
    // {
    //   id: 1,
    //   text: "Hello!",
    //   timestamp: "13-12-2024",
    //   userId: conversation.profileId,
    // },
    // {
    //   id: 2,
    //   text: "Hi there!",
    //   timestamp: "13-12-2024",
    //   userId: currentUser!.id,
    // },
  ]);

  useEffect(() => {
    socket?.on("receive-message", (message) => {
      console.log(message);
      setMessages((prev) => [...prev, { ...message }]);
    });

    return () => {
      socket?.off("receive-message");
    };
  }, [socket]);

  console.log(messages);

  return (
    <PageContent className="flex flex-col justify-end w-full h-full !text-white">
      <div className="max-h-[86vh] !overflow-y-auto overflow-x-hidden mx-6">
        <ChatUserInfo
          imageUrl={otherUser.imageUrl}
          name={otherUser.name}
          userName={otherUser.username}
          handleAddDelete={() => {}}
          isFriend
          isChannel={isChannel}
        />
        {messages.map((message, idx) => {
          const isFirstMessageOfDay =
            idx === 0 ||
            !isSameDay(
              new Date(message.timestamp),
              messages[idx - 1].timestamp
            );
          return (
            <ChatMessage
              key={message.id}
              isFirstMessageOfDay={isFirstMessageOfDay}
              otherUser={otherUser}
              currentUser={currentUser}
              message={message}
            />
          );
        })}
      </div>
      <ChatInput
        name={otherUser.name}
        otherUserId={otherUser.id}
        currentUserId={currentUser!.id}
      />
    </PageContent>
  );
};

export default ChatContent;
