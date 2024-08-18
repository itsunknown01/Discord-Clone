import { ReactNode } from "react";

import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { SocketProvider } from "@/hooks/context/use-socket-context";
import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/login");
  }

  const servers = await db.server.findMany({
    where: { profileId: profile?.id },
    include: {
      profile: true,
    },
  });

  return (
    <SocketProvider profile={profile}>
      <div className="h-full">
        <div className="bg-[#1E1F22] w-[72px] h-full flex flex-col fixed inset-y-0 z-30">
          <NavigationSidebar servers={servers} />
        </div>
        <main className="pl-[72px] h-full">{children}</main>
      </div>
    </SocketProvider>
  );
}
