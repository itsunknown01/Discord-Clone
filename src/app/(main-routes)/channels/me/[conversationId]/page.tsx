import ChatContent from "@/components/chat/chat-content";
import ChatHeader from "@/components/chat/chat-header";
import { Page } from "@/components/ui/page";
import { fetchAllFriendsWithProfileAndActivity } from "@/services/friends";
import { currentProfile } from "@/services/profile/current-profile";

const ConversationPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const profile = await currentProfile();

  const friends = await fetchAllFriendsWithProfileAndActivity(profile!.id);

  const conversation = friends!.some(
    (friend) => friend.profileId === params.conversationId
  )
    ? friends?.find((friend) => friend.profileId === params.conversationId)
    : friends?.find((friend) => friend.friendId === params.conversationId);

  console.log(conversation);
  return !conversation?.profileId || !conversation.friendId ? (
    <div className="flex flex-col bg-zinc-800/90 shadow-lg shadow-zinc-700/5 h-screen">
      <div className="p-4 text-base text-gray-400 ">
        Ups probably we cannot find your conversation please back to main page
      </div>
    </div>
  ) : (
    <Page>
      <ChatHeader
        conversation={conversation}
        type="direct"
        profileId={profile?.id}
      />
      <ChatContent conversation={conversation} currentUser={profile} />
    </Page>
  );
};

export default ConversationPage;
