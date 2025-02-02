import { BsPersonFill } from "react-icons/bs";

import MeFriendsContent from "@/components/me-page/me-friends-content";
import MeFriendsPanel from "@/components/me-page/me-friends-panel";
import MeHeader from "@/components/me-page/me-header";
import MeTabs from "@/components/me-page/me-tabs";
import MeWrapper from "@/components/me-page/me-wrapper";
import { PageContent } from "@/components/ui/page";
import { Separator } from "@/components/ui/separator";
import { fetchAllFriendsWithProfile } from "@/services/friends";
import { currentProfile } from "@/services/profile/current-profile";

export default async function MePage() {
  const profile = await currentProfile();

  const friends = await fetchAllFriendsWithProfile(profile!.id);

  const formattedFriends = friends?.some(
    (friend) => friend.profile1Id === profile!.id
  )
    ? friends!.map((friend) => ({
        id: friend.id,
        profileId: friend.profile2Id,
        name: friend.profile2.name,
        username: friend.profile2.username,
        imageUrl: friend.profile2.imageUrl,
        email: friend.profile2.email,
      }))
    : friends!.map((friend) => ({
        id: friend.id,
        profileId: friend.profile1Id,
        name: friend.profile1.name,
        username: friend.profile1.username,
        imageUrl: friend.profile1.imageUrl,
        email: friend.profile1.email,
      }));

  return (
    <MeWrapper>
      <MeHeader>
        <div className="flex gap-4 items-center">
          <div className="flex flex-none items-center gap-2 text-sm text-white font-semibold">
            <BsPersonFill className="text-gray-500" fontSize={22} />
            Friends
          </div>
          <Separator orientation="vertical" className="h-6 mt-1 bg-gray-500" />
          <MeTabs count={2} />
        </div>
      </MeHeader>
      <PageContent className="flex-col lg:flex-row h-full">
        <div className="flex flex-1 px-6 pt-4">
          <MeFriendsContent
            friends={formattedFriends}
            friendRequests={[]}
            users={[]}
          />
        </div>
        <div className="flex md:w-[360px]">
          <MeFriendsPanel friends={formattedFriends} />
        </div>
      </PageContent>
    </MeWrapper>
  );
}
