"use client";

import { useState } from "react";
import { ChatUserInfo } from "../chat/chat-user-info";
import ChatMessages from "../chat/chat-messages";
import InputField from "../ui/input-field";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Channel } from "@prisma/client";

interface ChannelChatProps {
    channel: Channel
}

export default function ChannelChat({channel} : ChannelChatProps) {
  const [messages, setMessages] = useState<any[]>([]);

  const handleDelete = () => {};

  let isFriend: any;

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDate.getFullYear()}`;
  return (
    <>
      <div className=" max-h-[86vh] !overflow-y-auto mx-6 ">
        <ChatUserInfo
          user={{}}
          handleAddDelete={handleDelete}
          isFriend={isFriend}
        />

        <div className="flex items-center">
          <Separator className="h-[1px] bg-white w-[45%] my-2" />
          <p className="flex  whitespace-nowrap px-1 text-xs font-semibold text-gray-400">
            {formattedDate}
          </p>
          <Separator className="h-[1px] bg-white w-[45%] my-2" />
        </div>

        <ChatMessages currentUser={{}} user={{}} messages={messages} />
      </div>
      <InputField className="mb-6 mx-6 bg-zinc-700">
        <Input
          className=" py-2 pl-12 pr-36 !placeholder-gray-600"
          type="text"
          placeholder={`Message ${channel.name}`}
        />
      </InputField>
    </>
  );
}
