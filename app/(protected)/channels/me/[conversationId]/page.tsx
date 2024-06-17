import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { Page, PageContent } from "@/components/ui/page";
import { db } from "@/services/db";

const ConversationPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {

  const friend = await db.friends.findUnique({
    where: { id: params.conversationId },
  });

  return (
    <Page>
      {!friend?.id ? (
        <div className="p-4 text-base text-gray-400">
          Oops probably we cannot find your conversation please back to main
          page
        </div>
      ) : (
        <>
          <ChatHeader user={friend} type="direct" />
          <PageContent className="flex-col w-full h-screen pr-1 min-h-0 justify-end mb-6">
            <ChatMessages user={friend} type="direct" />
            <ChatInput />
          </PageContent>
        </>
      )}
    </Page>
  );
};

export default ConversationPage;
