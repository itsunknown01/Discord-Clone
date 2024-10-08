"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-messages";
import { ChatUserInfo } from "@/components/chat/chat-user-info";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input-field";
import { PageContent } from "@/components/ui/page";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/hooks/redux/store";
import { useSocket } from "@/hooks/context/use-socket-context";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";

interface DirectChatMainProps {
  conversation: any;
  friends: any[];
  currentUser: Profile;
}

export default function DirectChatMain({
  conversation,
  friends,
  currentUser,
}: DirectChatMainProps) {
  const router = useRouter()
  if(!conversation?.id) {
    router.push("/channels/me")
  }
  
  const isFriend = useMemo(() => {
    return friends.some((friend) => friend.profile.id === conversation.id);
  }, [conversation.id, friends]);

  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      userId: conversation?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      userId: currentUser?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      userId: conversation?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 4,
      userId: currentUser?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 5,
      userId: conversation?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 6,
      userId: currentUser?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 7,
      userId: conversation?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 8,
      userId: currentUser?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 9,
      userId: conversation?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 10,
      userId: currentUser?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 11,
      userId: conversation?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 12,
      userId: currentUser?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
    {
      id: 13,
      userId: conversation?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
  ]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDate.getFullYear()}`;

  const { socket } = useSocket();

  const handleDelete = () => {
    socket?.emit("sendFriendRequest", {
      senderId: currentUser.id,
      receiverId: conversation.id,
    });
  };

  return (
    <>
      {!conversation?.id ? (
        <div className="p-4 text-base text-gray-400">
          Ups probably we cannot find your conversation please back to main page
        </div>
      ) : (
        <>
          <ChatHeader conversation={conversation} type="conversation" />
          <PageContent className="flex flex-col justify-end w-full h-full !text-white">
            <div className=" max-h-[86vh] !overflow-y-auto mx-6 ">
              <ChatUserInfo
                user={conversation}
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

              <ChatMessages
                currentUser={currentUser}
                user={conversation}
                messages={messages}
              />
            </div>
            <InputField className="mb-6 mx-6 bg-zinc-700">
              <Input
                className=" py-2 pl-12 pr-36 !placeholder-gray-600"
                type="text"
                placeholder={`write something to @${conversation.name}`}
              />
            </InputField>
          </PageContent>
        </>
      )}
    </>
  );
}
