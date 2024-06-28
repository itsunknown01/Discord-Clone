import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/profile/current-profile";
import { SocketResponse } from "@/lib/types";
import { db } from "@/services/db";
import { FriendRequetsStatus, NotificationTyoe } from "@prisma/client";

export async function POST(req: Request, res: SocketResponse) {
  try {
    const body = await req.json();

    const { senderId, receiverId } = body;

    const existingRequest = await db.friendRequets.findFirst({
      where: {
        senderId,
        receiverId,
      },
    });

    if (existingRequest) {
      return new NextResponse("Friend Request already exist", { status: 500 });
    }

    const friendRequest = await db.friendRequets.create({
      data: {
        senderId,
        receiverId,
        status: FriendRequetsStatus.PENDING,
      },
      include: {
        sender: true,
      },
    });

    return NextResponse.json({
      friendRequest,
      message: "Friend Request created successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Friend Request POST API", error);
  }
}
