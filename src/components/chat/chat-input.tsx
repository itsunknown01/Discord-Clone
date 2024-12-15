"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import ChatFeatureButton from "./chat-feature-button";

interface ChatInputProps {
  conversation: any;
  setMessages: Dispatch<SetStateAction<any[]>>;
}

const ChatInput = ({ conversation, setMessages }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      id: 1,
      text: message,
      userId: "757a8534-7fe1-4a3e-9872-34167d5a1ea2",
      timestamp: "13-12-2024",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("")
  };
  return (
    <form className="relative mb-6 mx-6 bg-zinc-700 rounded-md" onSubmit={addMessage}>
      <Input
        className=" py-[1.3rem] pl-12 pr-36 bg-zinc-700 border-none"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`write something to @${conversation.profile.name}`}
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
