"use client"

import { MdCall } from "react-icons/md";
import Avatar from "@/components/ui/avatar";
import { useRef, useState } from "react";

interface ChatMessagesProps {
    messages: any;
    user: any;
    currentUser: any
}

export default function ChatMessages({ messages,user,currentUser }: ChatMessagesProps) {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {messages.map((message, index) => (
        <div
          ref={chatContainerRef}
          key={message.id}
          className={`  ${
            index === 0 ||
            messages[index]?.userId !== messages[index - 1]?.userId
              ? "my-4"
              : "my-0 h-fit"
          } relative flex items-start gap-2`}
        >
          {message.bot === "endCall" ? (
            <div className="flex items-center space-x-2 py-1 text-xs text-gray-300">
              <MdCall className="text-lg text-green-500" />
              <p className="text-white"> {currentUser?.name}</p>
              <p className=""> {message.text}</p>
              <div className=" text-xs text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            </div>
          ) : (
            <>
              <Avatar
                className={` ${
                  index === 0 ||
                  messages[index]?.userId !== messages[index - 1]?.userId
                    ? "opacity-100"
                    : "!h-0 opacity-0"
                } z-[1]`}
                size="sm"
                src={
                  message?.userId === user?.id
                    ? user?.avatar
                    : currentUser?.avatar
                }
                alt="Avatar"
                status={user?.status}
              />
              <div className="flex w-full flex-col overflow-hidden ml-2">
                {(index === 0 ||
                  messages[index]?.userId !== messages[index - 1]?.userId) && (
                  <div className="flex items-center justify-start">
                    <div className="text-sm font-semibold">
                      {message?.userId === user?.id
                        ? user?.name
                        : currentUser?.name}
                    </div>
                    <div className=" ml-2 text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString([],{
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                  </div>
                )}
                <div>
                  {message.text}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}
