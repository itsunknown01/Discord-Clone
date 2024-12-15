import { ReactNode } from "react";

// import { SocketProvider } from "@/hooks/context/use-socket-context";
// import { currentProfile } from "@/services/profile/current-profile";
// import { db } from "@/services/db";
// import { redirect } from "next/navigation";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import ModalProvider from "@/components/providers/modal-provider";
import { servers } from "@/data";
// import { getDataWithCache } from "@/services/cache";
// import { Server } from "@prisma/client";

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  //   const profile = await currentProfile();

  //   if (!profile) {
  //     return redirect("/login");
  //   }

  //   const servers = await getDataWithCache({
  //     queryKey: `Servers:${profile.id}`,
  //     query: await db.server.findMany({
  //       where: { profileId: profile?.id },
  //       include: {
  //         profile: true,
  //       },
  //     }),
  //   });

  return (
    <div className="h-full">
      <div className="bg-[#1E1F22] w-[72px] h-full flex flex-col fixed inset-y-0 z-30">
        <NavigationSidebar servers={servers} />
      </div>
      <main className="pl-[72px] h-full">
        <ModalProvider />
        {children}
      </main>
    </div>
  );
}