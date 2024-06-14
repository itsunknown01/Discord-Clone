import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { Channel } from "@/lib/mock-data/channel";
import {
  ListedServer,
  MOCK_DELAY,
  MOCK_SERVERS,
  delay,
  generateRandomChannelsFake,
  generateRandomFakeServers,
} from "@/lib/mock-data/mock";
import { ReactNode } from "react";

const getData = async (): Promise<{
  servers: ListedServer[];
  channels: Channel[];
}> => {
  const servers: ListedServer[] = generateRandomFakeServers(MOCK_SERVERS);
  const channels: Channel[] = generateRandomChannelsFake(8);
  await delay(MOCK_DELAY);
  return { servers, channels };
};

const ChannelLayout = async ({ children }: { children: ReactNode }) => {
  const { servers, channels } = await getData();
  return (
    <div className="grid w-full h-full grid-cols-[5rem_auto_1fr]">
      <div className="bg-[#1E1F22] w-20">
        <NavigationSidebar servers={servers} channels={channels} />
      </div>
      {children}
    </div>
  );
};

export default ChannelLayout;
