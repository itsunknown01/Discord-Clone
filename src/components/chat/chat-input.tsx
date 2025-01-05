"use client";

import { FormEvent, useState } from "react";
import { useSocket } from "../providers/socket-provider";
import { Input } from "../ui/input";
import ChatFeatureButton from "./chat-feature-button";

interface ChatInputProps {
  otherUserId: string;
  name: string;
  currentUserId: string;
}

const ChatInput = ({ otherUserId, currentUserId, name }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const { socket } = useSocket();

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("send-message", {
      senderId: currentUserId,
      receiverId: otherUserId,
      message,
      timestamp: Date.now(),
    });

    setMessage("");
  };
  return (
    <form
      className="relative mb-6 mx-6 bg-zinc-700 rounded-md"
      onSubmit={addMessage}
    >
      <Input
        className=" py-[1.3rem] pl-12 pr-36 bg-zinc-700 border-none focus-visible:ring-0"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`write something to @${name}`}
      />
      <div className="absolute inset-y-0 left-2.5 flex items-center text-gray-300">
        <ChatFeatureButton />
      </div>
      <div className="absolute inset-y-0 right-2.5 flex items-center text-gray-300">
        otherpickers
        {/* <Button type="submit">Submit</Button> */}
      </div>
    </form>
  );
};

export default ChatInput;
