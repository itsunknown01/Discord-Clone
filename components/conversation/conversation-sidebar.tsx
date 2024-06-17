import React from "react";
import ConversationMenu from "./conversation-menu";
import Header from "../ui/header";
import FindChatButton from "../feature/find-chat-button";
import ConversationList from "./conversation-list";
import { auth } from "@/services/next-auth/auth";
import { db } from "@/services/db";

const ConversationSidebar = async () => {
  const session = await auth()
  const userId = session?.user.id

  const friends = await db.friends.findMany({
    where: { friendId: userId },
    include: {
      friend: true,
      activity: true
    } 
  })

  return (
    <div className="h-screen w-60 bg-zinc-800 flex flex-col">
      <Header verticalPadding="px-2" className="bg-zinc-800">
        <FindChatButton />
      </Header>
      <div className="hover-scrollbar flex-1 overflow-y-auto py-2 pl-2 pr-0.5">
        <ConversationMenu />
        <ConversationList friends={friends} />
      </div>
    </div>
  );
};

export default ConversationSidebar;