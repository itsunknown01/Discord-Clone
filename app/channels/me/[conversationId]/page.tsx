import { Page } from "@/components/ui/page";
import DirectChatMain from "@/components/chat/direct-chat-main";
import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";

export default async function ConversationIdPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const profile = await currentProfile();
  const friend = await db.friends.findFirst({
    where: {
      id: params.conversationId,
      friendId: profile?.id,
    },
    include: {
      profile: true,
    },
  });
  // const conversation = await db.conversation.findUnique({
  //   where: {
  //     UserOneId: profile?.id,
  //     UserTwoId: friend?.profileId
  //   }
  // })
  return (
    <Page>
      <DirectChatMain conversation={friend} />
    </Page>
  );
}
