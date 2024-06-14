import ChannelClient from "@/components/channels/channel-client";
import UserProfileInfo from "@/components/channels/user-profile-info";
import { Page, PageHeader } from "@/components/layouts/page";
import PageContent from "@/components/layouts/page/page-content";
import Avatar from "@/components/ui/avatar";
import {
  MOCK_DELAY,
  delay,
  generateRandomFakeChannels,
} from "@/lib/mock-data/mock";
import React from "react";

const getChannelById = async (id: string) => {
  const channel = generateRandomFakeChannels(1)[0];
  await delay(MOCK_DELAY);
  return { channel };
};

const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const { channel } = await getChannelById(params.id);
  
  return (
    <Page>
      <ChannelClient user={channel} />
    </Page>
  );
};

export default ConversationPage;
