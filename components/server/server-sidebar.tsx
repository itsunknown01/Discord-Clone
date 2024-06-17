import {
  MOCK_CHANNELS,
  MOCK_DELAY,
  delay,
  generateRandomChannelsFake,
  generateRandomFakeServers,
} from "@/lib/mock-data/mock";
import Header from "../ui/header";
import ServerHeader from "./server-header";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { ChannelType, MemberRole } from "@/lib/mock-data/channel";
import { Separator } from "../ui/separator";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/services/db";

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 w-4 h-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 w-4 h-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 2-4 h-4" />,
};

const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-indigo-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-rose-500" />
  ),
  [MemberRole.GUEST]: null,
};

export default async function ServerSidebar({serverId} : {
  serverId: string;
}) {
  const profile = await currentProfile()

  if(!profile) {
    return redirect('/login')
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  return (
    <div className="h-screen w-60 bg-zinc-800 flex flex-col">
      <Header verticalPadding="px-2" className="bg-zinc-800">
        <ServerHeader server={server} />
      </Header>

      <ScrollArea className="flec-1 px-3">
        <div className="mt-2">server search</div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels?.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
