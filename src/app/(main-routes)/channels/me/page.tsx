import MeFriendsContent from "@/components/me-page/me-friends-content";
import MeFriendsPanel from "@/components/me-page/me-friends-panel";
import MeHeader from "@/components/me-page/me-header";
import MeTabs from "@/components/me-page/me-tabs";
import MeWrapper from "@/components/me-page/me-wrapper";
import { PageContent } from "@/components/ui/page";
import { Separator } from "@/components/ui/separator";
import { friends, profile } from "@/data";
import { BsPersonFill } from "react-icons/bs";

export default async function MePage() {
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
      <PageContent className="flex-col lg:flex-row">
        <div className="flex flex-1 px-6 pt-4">
          <MeFriendsContent
            friends={friends}
            friendRequests={[]}
            users={Object.values(profile)}
          />
        </div>
        <div className="flex md:w-[360px]">
          <MeFriendsPanel friends={friends} />
        </div>
      </PageContent>
    </MeWrapper>
  );
}
