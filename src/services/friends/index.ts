import { db } from "../db";

export const fetchAllFriendsWithProfileAndActivity = async (
  profileId: string
) => {
  try {
    const friends = await db.friends.findMany({
      where: {
        OR: [{ profile1Id: profileId }, { profile2Id: profileId }],
      },
      include: {
        profile1: true,
        profile2: true,
        activity: true,
      },
    });

    return friends;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllFriendsWithProfile = async (
  profileId: string
) => {
  try {
    const friends = await db.friends.findMany({
      where: {
        OR: [{ profile1Id: profileId }, { profile2Id: profileId }],
      },
      include: {
        profile1: true,
        profile2: true,
      },
    });

    return friends;
  } catch (error) {
    console.log(error);
  }
};
