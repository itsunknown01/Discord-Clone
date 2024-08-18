import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { serverSchema } from "@/schemas";
import { db } from "@/services/db";
import { currentProfile } from "@/lib/profile/current-profile";
import { ChannelType, MemberRole } from "@prisma/client";

export async function POST(req: Request, res: Response) {
  try {
    const profile = await currentProfile();
    const { values } = await req.json();

    const validation = serverSchema.safeParse(values);

    if (!validation.success) {
      return new NextResponse("Invalid Fields", { status: 401 });
    }

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, imageUrl } = validation.data;

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    await db.category.createMany({
      data: [
        {
          name: "TEXT CHANNELS",
          serverId: server.id,
          profileId: profile.id,
        },
        {
          name: "VOICE CHANNELS",
          serverId: server.id,
          profileId: profile.id,
        },
      ],
    });

    const [textCategory, voiceCategory] = await db.category.findMany({
      where: { serverId: server.id },
      orderBy: { createdAt: "asc" },
    });

    await db.channel.createMany({
      data: [
        {
          name: "general",
          type: ChannelType.TEXT,
          categoryId: textCategory.id,
          serverId: server.id,
          profileId: profile.id,
        },
        {
          name: "General",
          type: ChannelType.AUDIO,
          categoryId: voiceCategory.id,
          serverId: server.id,
          profileId: profile.id,
        }
      ]
    })

    return NextResponse.json({ message: "Server created", status: 200 });
  } catch (error) {
    console.log(error);
  }
}
