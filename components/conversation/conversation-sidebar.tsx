import React from "react";
import ConversationMenu from "./conversation-menu";
import Header from "../ui/header";
import FindChatButton from "../feature/find-chat-button";
import ConversationList from "./conversation-list";

const ConversationSidebar = () => {
  return (
    <div className="h-screen w-60 bg-zinc-800 flex flex-col">
      <Header verticalPadding="px-2" className="bg-zinc-800">
        <FindChatButton />
      </Header>
      <div className="hover-scrollbar flex-1 overflow-y-auto py-2 pl-2 pr-0.5">
        <ConversationMenu />
        <ConversationList />
      </div>
    </div>
  );
};

export default ConversationSidebar;