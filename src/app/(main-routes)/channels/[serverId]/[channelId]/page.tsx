import ChatContent from "@/components/chat/chat-content";
import ChatHeader from "@/components/chat/chat-header";
import { Page } from "@/components/ui/page";
import { profile, servers } from "@/data";

const ChannelPage = async ({
  params,
}: {
  params: { channelId: string; serverId: string };
}) => {
  const server = servers.find((server) => server.id === params.serverId);

  const channel = server?.channels.find(
    (channel) => channel.id === params.channelId
  );
  return (
    <Page className="w-full">
      <ChatHeader conversation={channel} type="server" />
      <ChatContent conversation={channel} currentUser={profile} isChannel />
    </Page>
  );
};

export default ChannelPage;
