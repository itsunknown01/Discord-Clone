import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { Page, PageContent } from "@/components/ui/page";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/services/db";
import { redirect } from "next/navigation";

const ServerPage = async ({
  params,
}: {
  params: { channelId: string; serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/login");
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
    },
  });

  return (
    <Page>
      <ChatHeader channel={channel} type="channel" />
      <PageContent className="flex-col w-full h-screen pr-1 min-h-0 justify-end mb-6">
        <ChatMessages type="channel" server={server} />
        <ChatInput />
      </PageContent>
    </Page>
  );
};

export default ServerPage;
