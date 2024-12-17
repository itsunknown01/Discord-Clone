import { db } from "@/services/db";
import { auth } from "@/services/next-auth/auth";
import { redirect } from "next/navigation";
import { currentProfile } from "./current-profile";
import { getDataWithCache } from "../cache";

export async function InitialProfile() {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) {
    return redirect(`/login`);
  }

  const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    })
  
  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id as string,
      name: user.name as string,
      email: user.email as string,
      username: user.username,
    },
  });

  return newProfile;
}