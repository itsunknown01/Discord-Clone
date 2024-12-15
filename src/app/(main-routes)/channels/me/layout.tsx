// import ConversationSidebar from "@/components/conversation/conversation-sidebar";
// import { currentProfile } from "@/services/profile/current-profile";
// import { getDataWithCache } from "@/services/cache";
// import { db } from "@/services/db";

import ConversationSidebar from "@/components/conversation/conversation-sidebar";
import { friends, profile } from "@/data";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const profile = await currentProfile();

//   const friends = await getDataWithCache({
//     queryKey: `AllFriends:${profile?.userId}`,
//     query: await db.friends.findMany({ 
//       where: {
//         friendId: profile?.id,
//       },
//       include: {
//         profile: true,
//         activity: true,
//       },
//     })
//   });

  return (
    <div className="h-full w-full">
      <div className="w-60 flex flex-col fixed inset-y-0 z-20">
        <ConversationSidebar friends={friends} profile={profile} />
      </div>
      <main className="h-screen pl-60 w-full">{children}</main>
    </div>
  );
}