"use client";

import React, { useState } from "react";
import { isSameDay } from "date-fns";
import { PageContent } from "../ui/page";
import { ChatUserInfo } from "./chat-userInfo";
import ChatMessage from "./chat-message";
import { Profile } from "@/types";
import ChatInput from "./chat-input";

interface ChatContentProps {
  conversation: any;
  currentUser: Profile;
  isChannel?: boolean;
}

const ChatContent = ({
  conversation,
  currentUser,
  isChannel,
}: ChatContentProps) => {
  const [messages, setMessages] = useState<any[]>([]);

  return (
    <PageContent className="flex flex-col justify-end w-full h-full !text-white">
      <div className="max-h-[86vh] !overflow-y-auto overflow-x-hidden mx-6">
        <ChatUserInfo
          user={conversation}
          handleAddDelete={() => {}}
          isFriend
          isChannel={isChannel}
        />
        {messages.map((message, idx) => {
          const isFirstMessageOfDay =
            idx === 0 ||
            !isSameDay(message.timestamp, messages[idx - 1].timestamp);
          return (
            <ChatMessage
              key={message.id}
              isFirstMessageOfDay={isFirstMessageOfDay}
              user={conversation}
              currentUser={currentUser}
              message={message}
            />
          );
        })}
      </div>
      <ChatInput conversation={conversation} setMessages={setMessages} />
    </PageContent>
  );
};

export default ChatContent;
