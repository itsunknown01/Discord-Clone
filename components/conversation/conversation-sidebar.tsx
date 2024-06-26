import FindChatButton from "@/components/feature/find-chat-button";
import { Header } from "@/components/ui/header";
import ConversationMenu from "@/components/conversation/conversation-menu";
import ConversationList from "./conversation-list";
import CurrentUserStatus from "../current-user-status/current-user-status";

interface ConversationSidebarProps {
  friends: any[];
  profile: any;
}

export default function ConversationSidebar({
  friends,
  profile,
}: ConversationSidebarProps) {
  return (
    <div className="h-screen w-60 bg-zinc-800 flex flex-col">
      <Header verticalPadding="px-2" className="bg-zinc-800">
        <FindChatButton friends={friends} />
      </Header>
      <div className="hover-scrollbar flex-1 overflow-y-auto py-2 pl-2 pr-0.5">
        <ConversationMenu />
        <ConversationList friends={friends} />
      </div>
      <CurrentUserStatus profile={profile} />
    </div>
  );
}