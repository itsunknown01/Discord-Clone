import ConversationSidebar from "@/components/conversation/conversation-sidebar";
import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await currentProfile();

  const friends = await db.friends.findMany({
    where: {
      friendId: profile?.id
    },
    include: {
      profile: true,
      activity: true
    }
  })

  return (
    <>
      <ConversationSidebar friends={friends} profile={profile} />
      {children}
    </>
  );
}