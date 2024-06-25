import { ReactNode } from "react";

import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { SocketProvider } from "@/hooks/context/use-socket-context";
import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profile = await currentProfile();

  const servers = await db.server.findMany({
    where: { profileId: profile?.id },
    include: {
      profile: true,
    },
  });

  return (
    <SocketProvider isAuthenticated={!!profile}>
      <div className="grid w-full h-screen grid-cols-[5rem_auto_1fr]">
        <div className="bg-[#1E1F22] w-20 h-screen">
          <NavigationSidebar servers={[]} />
        </div>
        {children}
      </div>
    </SocketProvider>
  );
}
