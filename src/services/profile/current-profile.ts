import { db } from "@/services/db";
import { auth } from "@/services/next-auth/auth";

export async function currentProfile() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });
  return profile;
}
