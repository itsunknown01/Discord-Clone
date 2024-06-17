import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { FriendType, MemberRole, UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs"

import { currentProfile } from "@/lib/current-profile";
import { generateRandomFakeServers, generateRandomUsersFake } from "@/lib/mock-data/mock";
import { db } from "@/services/db";
import { auth } from "@/services/next-auth/auth";

export async function GET(req: Request, res: Response) {
  try {
  //   const profile = await currentProfile();
  //   const { searchParams } = new URL(req.url);
  //   const length = Number(searchParams.get("length")) || 10;

  //   const fakeUser = generateRandomUsersFake(length);

  //   const hashedPassword = await bcrypt.hash('bootu123', 10);

  //   const usersToCreate = fakeUser.map(user => ({
  //     ...user,
  //     password: hashedPassword,
  //   }));

  //   const createdUsers = await Promise.all(
  //     usersToCreate.map((user) =>
  //       db.user.create({
  //         data: {
  //           name: user.name,
  //           username: user.username,
  //           email: user.email,
  //           password: hashedPassword,
  //           image: user.image,
  //           dateOfBirth: user.dateOfBirth
  //         },
  //       })
  //     )
  //   );

  //   return NextResponse.json({ createdUsers });

    const session = await auth();
    const userId = session?.user.id

    const users = await db.user.findMany();

    const filteredUsers = users.filter(user => user.id !== userId)

    const friends = await Promise.all(
      filteredUsers.map(user => db.friends.create({
        data: {
          userId: user.id,
          friendId: userId as string,
          name: user.name as string,
          username: user.username as string,
          status: UserStatus.Offline,
          avatar: user.image,
          type: FriendType.User
        }
      }))
    )

    return NextResponse.json({ friends });
  } catch (error) {
    console.log(error);
  }
}
