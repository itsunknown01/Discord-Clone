import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";
import {
  FriendRequetsStatus,
  FriendType,
  NotificationTyoe,
  UserStatus,
} from "@prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    if (!params.requestId) {
      return new NextResponse("Request ID is required", { status: 400 });
    }

    const existingRequest = await db.friendRequets.findFirst({
      where: {
        id: params.requestId,
      },
    });

    if (!existingRequest) {
      return new NextResponse("Friend Request does not exist", { status: 500 });
    }

    const friendRequest = await db.friendRequets.update({
      where: {
        id: params.requestId,
        status: FriendRequetsStatus.PENDING,
      },
      data: {
        status: FriendRequetsStatus.ACCEPTED,
      },
      include: {
        sender: true,
      },
    });

    await db.friends.create({
        data: {
            profileId: friendRequest.receiverId,
            friendId: friendRequest.senderId,
            type: FriendType.User,
            status: UserStatus.Offline
        }
    })
    return NextResponse.json({
      friendRequest,
      message: "Friend Request created successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Friend Request PUT API", error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    if (!params.requestId) {
      return new NextResponse("Request ID is required", { status: 400 });
    }

    const existingRequest = await db.friendRequets.findFirst({
      where: {
        id: params.requestId,
      },
    });

    if (!existingRequest) {
      return new NextResponse("Friend Request does not exist", { status: 500 });
    }

    const friendRequest = await db.friendRequets.update({
      where: {
        id: params.requestId,
        status: FriendRequetsStatus.PENDING,
      },
      data: {
        status: FriendRequetsStatus.REJECTED,
      }
    });

    return NextResponse.json({
      friendRequest,
      message: "Friend Request created successfully",
      status: 200,
    });
  } catch (error) {
    console.log("Friend Request PUT API", error);
  }
}