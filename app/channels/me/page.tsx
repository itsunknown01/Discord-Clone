import { BsPersonFill } from "react-icons/bs";

import FriendsTabs from "@/components/friends/friends-tab";
import { Page, PageContent, PageHeader } from "@/components/ui/page";
import { Separator } from "@/components/ui/separator";
import FriendsList from "@/components/friends/friends-list";

export default function MePage() {
  return (
    <Page>
      <PageHeader>
        <div className="flex gap-4">
          <div className="flex flex-none items-center gap-2 text-sm font-semibold">
            <BsPersonFill className="text-gray-500" fontSize={22} />
            Friends
          </div>
          <Separator orientation="vertical" className="h-4 mt-1 bg-white" />
          <FriendsTabs count={2} />
        </div>
      </PageHeader>
      <PageContent className="flex-col lg:flex-row">
        <div className="flex flex-1 px-6 pt-4">
          <FriendsList
            friends={[]}
            friendRequests={[]}
          />
        </div>
        <div className="flex md:w-[360px]">Active Panel</div>
      </PageContent>
    </Page>
  );
}
