import ChatContent from "@/components/chat/chat-content";
import ChatHeader from "@/components/chat/chat-header";
import { Page } from "@/components/ui/page";
import { friends, profile } from "@/data";

const ConversationPage = ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversation = friends.find(
    (friend) => friend.id === params.conversationId
  );

  return !conversation?.id ? (
    <div className="flex flex-col bg-zinc-800/90 shadow-lg shadow-zinc-700/5 h-screen">
      <div className="p-4 text-base text-gray-400 ">
        Ups probably we cannot find your conversation please back to main page
      </div>
    </div>
  ) : (
    <Page>
      <ChatHeader conversation={conversation} type="direct" />
      <ChatContent conversation={conversation} currentUser={profile} />
    </Page>
  );
};

export default ConversationPage;