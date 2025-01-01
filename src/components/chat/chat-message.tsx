"use client";

import { useParams } from "next/navigation";
import UserAvatar from "../common/user-avatar";
import { Separator } from "../ui/separator";
import { useSocket } from "../providers/socket-provider";
import { useEffect, useState } from "react";
import { UserStatusType } from "@/types";

interface ChatMessageProps {
  message: any;
  user: any;
  currentUser: any;
  isFirstMessageOfDay: boolean;
}

export default function ChatMessage({
  message,
  user,
  currentUser,
  isFirstMessageOfDay,
}: ChatMessageProps) {
  const params = useParams();
  const [status, setStatus] = useState<UserStatusType>("Offline");

  const { onlineUsers } = useSocket();

  useEffect(() => {
    const statusMap: { [key: string]: void } = {};

    if (params.conversationId === currentUser.id) {
      statusMap[user.friendId] = onlineUsers.includes(user.friendId)
        ? setStatus("Online")
        : setStatus("Offline");
    } else {
      statusMap[user.profileId] = onlineUsers.includes(user.profileId)
        ? setStatus("Online")
        : setStatus("Offline");
    }
  }, [
    user.friendId,
    user.profileId,
    onlineUsers,
    params.conversationId,
    currentUser.id,
    setStatus,
  ]);
  return (
    <>
      {isFirstMessageOfDay && (
        <div className="flex items-center">
          <Separator className="h-[1px] bg-white w-[45%] my-2" />
          <p className="flex  whitespace-nowrap px-1 text-xs font-semibold text-gray-400">
            {new Date(message.timestamp).toDateString()}
          </p>
          <Separator className="h-[1px] bg-white w-[45%] my-2" />
        </div>
      )}
      {/* <div className="flex my-2">
        <UserAvatar
          className={`z-[1]`}
          size="sm"
          src={
            message?.senderId === user?.profileId || user?.friendId
              ? currentUser?.avatar
              : user.profileId === params.conversationId
                ? user.friend.imageUrl
                : user?.profile.imageUrl
          }
          alt="Avatar"
          status={status}
        />
        <div className="flex w-full flex-col overflow-hidden ml-2">
          <div className="flex items-center justify-start">
            <div className="text-sm font-semibold">
              {message.receiverId === user.id
                ? currentUser.name
                : user.profileId === params.conversationId
                  ? user.friend.name
                  : user?.profile.name}
            </div>
            <div className=" ml-2 text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          </div>
          <div>{message.message}</div>
        </div>
      </div> */}
    </>
  );
}
