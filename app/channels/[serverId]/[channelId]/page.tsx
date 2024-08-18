import ChannelChat from "@/components/channel/channel-chat";
import ChannelVideo from "@/components/channel/channel-video";
import ChatHeader from "@/components/chat/chat-header";
import { Page, PageContent } from "@/components/ui/page";
import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

const ChannelPage = async ({
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

  const member = await db.member.findMany({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/channels/me");
  }
  return (
    <Page className="w-full">
      <ChatHeader conversation={{}} type="channel" name={channel?.name} />
      <PageContent className="flex flex-col justify-end w-full h-full !text-white">
        {channel.type === ChannelType.TEXT ? (
          <ChannelChat channel={channel} />
        ) : (
          <ChannelVideo currentUser={profile} members={member} />
        )}
      </PageContent>
    </Page>
  );
};

export default ChannelPage;
