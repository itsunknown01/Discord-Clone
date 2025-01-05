import ChatContent from "@/components/chat/chat-content";
import ChatHeader from "@/components/chat/chat-header";
import { Page } from "@/components/ui/page";
import { getOrCreateConverstion } from "@/services/conversation";
import { fetchAllFriendsWithProfileAndActivity } from "@/services/friends";
import { currentProfile } from "@/services/profile/current-profile";
import { OtherProfile } from "@/services/profile/other-profile";
import { redirect } from "next/navigation";

const ConversationPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const profile = await currentProfile();

  const conversation = await getOrCreateConverstion(
    profile!.id,
    params.conversationId
  );

  if (!conversation) {
    return redirect(`/channels/me`);
  }

  const { UserOne, UserTwo } = conversation;

  const otherProfile = UserOne.id === profile!.id ? UserTwo : UserOne;

  return !conversation.id ? (
    <div className="flex flex-col bg-zinc-800/90 shadow-lg shadow-zinc-700/5 h-screen">
      <div className="p-4 text-base text-gray-400 ">
        Ups probably we cannot find your conversation please back to main page
      </div>
    </div>
  ) : (
    <Page>
      <ChatHeader
        name={otherProfile.name}
        imageUrl={otherProfile.imageUrl}
        otherProfileId={otherProfile.id}
        type="direct"
      />
      <ChatContent otherUser={otherProfile} currentUser={profile} />
    </Page>
  );
};

export default ConversationPage;
