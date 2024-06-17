import ChannelClient from "@/components/channels/channel-client";
import { Page } from "@/components/layouts/page";
import {
  MOCK_DELAY,
  delay,
  generateRandomFakeChannels,
} from "@/lib/mock-data/mock";
import { db } from "@/services/db";

const getChannelById = async (id: string) => {
  const channel = generateRandomFakeChannels(1)[0];
  await delay(MOCK_DELAY);
  return { channel };
};

const ConversationPage = async ({ params }: { params: { conversationId: string } }) => {
  const { channel } = await getChannelById(params.conversationId);

  const friends = await db.friends.findUnique({
    where: {id: params.conversationId}
  })

  return (
    <Page>
      <ChannelClient user={friends} type="direct" />
    </Page>
  );
};

export default ConversationPage;
