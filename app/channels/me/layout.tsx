import ConversationSidebar from "@/components/conversation/conversation-sidebar";
import { currentProfile } from "@/lib/profile/current-profile";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await currentProfile();
  return (
    <>
      <ConversationSidebar friends={[]} profile={profile} />
      {children}
    </>
  );
}
