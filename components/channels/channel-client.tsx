"use client";

import {
  AiFillGift,
  AiFillPlusCircle,
  AiOutlineFileText,
  AiOutlineGif,
} from "react-icons/ai";
import { CgSmileMouthOpen } from "react-icons/cg";

import { User } from "@/lib/mock-data/mock";
import { PageHeader } from "../layouts/page";
import PageContent from "../layouts/page/page-content";
import Avatar from "../ui/avatar";
import UserProfileInfo from "./user-profile-info";
import { useChannelStore } from "@/hooks/customs/use-channel-store";
import { useFriendStore } from "@/hooks/customs/use-friends-store";
import { Separator } from "../ui/separator";
import InputField from "../ui/input-field";
import { Input } from "../ui/input";
import { useState } from "react";
import { useCurrentUserStore } from "@/hooks/customs/use-current-user-tab";
import { MessageBox } from "./message-box";

interface Message {
  id: number;
  userId?: string;
  text: string;
  timestamp: string;
  bot?: string;
}

export default function ChannelClient({ user }: { user: User | undefined }) {
  const { channels } = useChannelStore();
  const { friends, setFriends } = useFriendStore();
  const { currentUser } = useCurrentUserStore();

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDate.getFullYear()}`;

  const [newMessage, setNewMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      userId: user?.id,
      text: "Hello! How are you?",
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageText(e.target.value);
  };

  const handleSubmit = () => {
    const newMessageObj = {
      id: messages.length + 1,
      userId: currentUser?.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessageObj]);
    setNewMessageText("");
  };

  const intersection = channels?.filter((channel) =>
    friends?.includes(channel)
  );
  const isFriend = intersection?.some((friend) => friend.id === user?.id);

  const handleAddDelete = () => {
    if (friends !== null) {
      if (isFriend) {
        setFriends(friends.filter((friend) => friend.id !== user?.id));
      } else {
        const newFriend = channels?.find((channel) => channel.id === user?.id);
        if (newFriend) {
          setFriends([newFriend, ...friends]);
        }
      }
    }
  };
  return (
    <>
      {!user?.id ? (
        <div className="p-4 text-base text-gray-400">
          Ups probably we cannot find your conversation please back to main page
        </div>
      ) : (
        <>
          <PageHeader user={user}>
            <div className="flex items-center gap-4">
              <div className="flex flex-none items-center gap-3 text-sm font-semibold">
                <Avatar
                  size="sm"
                  src={user?.avatar}
                  alt="avatar"
                  status={user?.status}
                />
                {user?.name}
              </div>
            </div>
          </PageHeader>
          <PageContent className="flex-col w-full h-full pb-6 pr-1">
            <div className="max-h-[86vh] !overflow-y-auto">
              <UserProfileInfo
                user={user}
                handleAddDelete={handleAddDelete}
                isFriend={isFriend}
              />
              <div className="flex items-center mx-6">
                <Separator className="h-[1px] w-[45%] bg-white" />
                <p className="flex  whitespace-nowrap px-1 text-xs font-semibold text-gray-400">
                  {formattedDate}
                </p>
                <Separator className="h-[1px] w-[48%] bg-white" />
              </div>
              <MessageBox
                messages={messages}
                user={user}
                currentUser={currentUser}
              />
            </div>
            <InputField
              startIcon={
                <AiFillPlusCircle
                  className="cursor-pointer hover:text-gray-200"
                  size={22}
                />
              }
              endIcon={
                <div className="flex h-full cursor-pointer items-center space-x-2.5 text-gray-400 ">
                  <AiFillGift className="hover:text-gray-300" size={22} />
                  <AiOutlineGif className="hover:text-gray-300" size={22} />
                  <AiOutlineFileText
                    className="hover:text-gray-300"
                    size={22}
                  />
                  <CgSmileMouthOpen className="hover:text-gray-300" size={22} />
                </div>
              }
              className="!relative bottom-0 left-0 right-0 mx-6 mb-4 w-auto bg-foreground"
            >
              <Input
                className=" py-2 pl-12 pr-36 !placeholder-gray-600"
                type="text"
                placeholder={`write something to @${user.name}`}
                value={newMessage}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit();
                  }
                }}
                onChange={handleInputChange}
              />
            </InputField>
            <div className=" absolute bottom-0 left-0 right-0 !z-[9]  h-8 bg-foreground" />
          </PageContent>
        </>
      )}
    </>
  );
}
