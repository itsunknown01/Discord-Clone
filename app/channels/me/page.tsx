import { BsPersonFill } from "react-icons/bs";

import FriendsTabs from "@/components/friends/friends-tab";
import { Page, PageContent, PageHeader } from "@/components/ui/page";
import { Separator } from "@/components/ui/separator";
import FriendsList from "@/components/friends/friends-list";
import FriendActivePanel from "@/components/friends/friend-active-panel";
import { currentProfile } from "@/lib/profile/current-profile";
import { db } from "@/services/db";
import { redirect } from "next/navigation";
import { FriendRequetsStatus } from "@prisma/client";
import { FriendDataType } from "@/lib/types";

export default async function MePage() {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/channels");
  }

  const friends = await db.friends.findMany({
    where: {
      friendId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  const formattedFriends:FriendDataType[] = friends.map(friend => ({
    id: friend.id,
    profileId: friend.profileId,
    name: friend.profile.name,
    username: friend.profile.username,
    imageUrl: friend.profile.imageUrl,
    profile_status: friend.status,
    status: friend.profile.status,
    email: friend.profile.email
  }))

  const friendRequests = await db.friendRequets.findMany({
    where: {
      receiverId: profile.id,
      status: FriendRequetsStatus.PENDING,
    },
    include: {
      sender: true,
    },
  });

  const formattedRequests = friendRequests.map(request => ({
    id: request.id,
    name: request.sender.name,
    username: request.sender.username,
    email: request.sender.email,
    imageUrl: request.sender.imageUrl,
    status: request.sender.status
  }))

  const profiles = await db.profile.findMany({
    where: {
      NOT: {
        id: profile.id
      }
    }
  })

  return (
    <Page>
      <PageHeader>
        <div className="flex gap-4">
          <div className="flex flex-none items-center gap-2 text-sm font-semibold">
            <BsPersonFill className="text-gray-500" fontSize={22} />
            Friends
          </div>
          <Separator orientation="vertical" className="h-4 mt-1 bg-white" />
          <FriendsTabs count={formattedRequests.length} />
        </div>
      </PageHeader>
      <PageContent className="flex-col lg:flex-row">
        <div className="flex flex-1 px-6 pt-4">
          <FriendsList
            friends={formattedFriends}
            friendRequests={formattedRequests}
            users= {profiles}
          />
        </div>
        <div className="flex md:w-[360px]">
          <FriendActivePanel />
        </div>
      </PageContent>
    </Page>
  );
}
