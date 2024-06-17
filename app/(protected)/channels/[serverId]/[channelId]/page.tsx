import ChannelClient from "@/components/channels/channel-client";
import { Page } from "@/components/layouts/page";
import { currentProfile } from "@/lib/current-profile";
import {
  MOCK_DELAY,
  delay,
  generateRandomFakeChannels,
} from "@/lib/mock-data/mock";
import { db } from "@/services/db";
import { redirect } from "next/navigation";
import React from "react";

const getChannelById = async (id: string) => {
  const channel = generateRandomFakeChannels(1)[0];
  await delay(MOCK_DELAY);
  return { channel };
};

const ServerPage = async ({ params }: { params: { channelId: string } }) => {
  const { channel } = await getChannelById(params.channelId);

  const profile = await currentProfile();

  if (!profile) {
    return redirect("/login");
  }

  const Channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  return (
    <Page>
      <ChannelClient user={channel} type="channel" name={Channel?.name} />
    </Page>
  );
};

export default ServerPage;
