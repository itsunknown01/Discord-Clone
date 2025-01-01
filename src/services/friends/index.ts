import { db } from "../db";

export const fetchAllFriendsWithProfileAndActivity = async (
  profileId: string
) => {
  try {
    const friends = await db.friends.findMany({
      where: {
        OR: [{ friendId: profileId }, { profileId }],
      },
      include: {
        profile: true,
        friend: true,
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
        OR: [{ friendId: profileId }, { profileId }],
      },
      include: {
        profile: true,
        friend: true,
      },
    });

    return friends;
  } catch (error) {
    console.log(error);
  }
};
