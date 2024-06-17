import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/services/db";
import { ReactNode } from "react";

const ChannelLayout = async ({ children }: { children: ReactNode }) => {
  const profile = await currentProfile()
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile?.id
        }
      }
    },
    include: {
      channels: true
    }
  })

  return (
    <div className="grid w-full h-screen grid-cols-[5rem_auto_1fr]">
      <div className="bg-[#1E1F22] w-20 h-screen">
        <NavigationSidebar servers={servers} />
      </div>
      {children}
    </div>
  );
};

export default ChannelLayout;
