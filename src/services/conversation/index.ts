import { db } from "../db";

export const getOrCreateConverstion = async (
  profile1Id: string,
  profile2Id: string
) => {
  let conversation =
    (await findConversation(profile1Id, profile2Id)) ||
    (await findConversation(profile2Id, profile1Id));

  if (!conversation) {
    conversation = await createNewConversation(profile1Id, profile2Id);
  }

  return conversation;
};

const findConversation = async (profile1Id: string, profile2Id: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ UserOneId: profile1Id }, { UserTwoId: profile2Id }],
      },
      include: {
        UserOne: true,
        UserTwo: true,
      },
    });
  } catch (error) {
    return null;
  }
};

const createNewConversation = async (
  profile1Id: string,
  profile2Id: string
) => {
  try {
    return await db.conversation.create({
      data: {
        UserOneId: profile1Id,
        UserTwoId: profile2Id,
      },
      include: {
        UserOne: true,
        UserTwo: true,
      },
    });
  } catch (error) {
    return null;
  }
};