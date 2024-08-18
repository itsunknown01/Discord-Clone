import { Page } from "@/components/ui/page";
import DirectChatMain from "@/components/chat/direct-chat-main";
import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";
import { redirect } from "next/navigation";

// http://localhost:3000/channels/me/2976f32b-7de1-4e37-9d46-b68b058ff103

export default async function ConversationIdPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/login");
  }
  const friends = await db.friends.findMany({
    where: {
      profileId: params.conversationId,
      friendId: profile?.id,
    },
    include: {
      profile: true,
    },
  });

  const user = await db.profile.findFirst({
    where: {
      id: params.conversationId,
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
      <DirectChatMain
        conversation={user}
        friends={friends}
        currentUser={profile}
      />
    </Page>
  );
}
