import { Profile, Server } from "@prisma/client";
import { db } from "../db";

export interface ServerWithProfile extends Server {
    profile: Profile
}

export const fetchServersWithProfile = async (profileId: string ) => {
  try {
    const servers = await db.server.findMany({
      where: { profileId: profileId },
      include: {
        profile: true,
      },
    });

    return servers
  } catch (error) {
    console.log(error);
  }
};