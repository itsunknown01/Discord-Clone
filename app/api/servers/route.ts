import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { serverSchema } from "@/schemas";
import { db } from "@/services/db";
import { currentProfile } from "@/lib/profile/current-profile";

export async function POST(req: Request, res: Response) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    const validation = serverSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: "Invalid Fields" });
    }

    if (!profile) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const { name, imageUrl } = validation.data;

    await db.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: uuidv4(),
        profileId: profile?.id as string,
      },
    });

    return NextResponse.json({ message: "Server created", status: 200 });
  } catch (error) {
    console.log(error);
  }
}