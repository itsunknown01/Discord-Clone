import ActiveNowPanel from "@/components/layouts/active-now-panel";
import FriendsList from "@/components/layouts/friends-list";
import FriendsTabs from "@/components/layouts/friends-tab";
import { Page, PageHeader } from "@/components/layouts/page";
import PageContent from "@/components/layouts/page/page-content";
import { Separator } from "@/components/ui/separator";
import { MOCK_DELAY, MOCK_FRIENDS, User, delay, generateRandomFakeUsers } from "@/lib/mock-data/mock";
import { BsPersonFill } from "react-icons/bs";

interface FriendFetchData {
  friends: User[];
  friendRequests: User[];
  blockedFriends: User[];
}

const getData = async (): Promise<FriendFetchData> => {
  /*
   * Generating fake users for test
   */
  const friends: User[] = generateRandomFakeUsers(MOCK_FRIENDS);
  const friendRequests: User[] = generateRandomFakeUsers(6);
  const blockedFriends: User[] = [];

  await delay(MOCK_DELAY);
  return { friends, friendRequests, blockedFriends };
};


const MePage = async () => {
  const data = await getData()
  return (
    <Page>
      <PageHeader>
        <div className="flex gap-4">
          <div className="flex flex-none items-center gap-2 text-sm font-semibold">
            <BsPersonFill className="text-gray-500" fontSize={22} />
            Friends
          </div>
          <Separator orientation="vertical" className="h-4 mt-1 bg-white" />
          <FriendsTabs />
        </div>
      </PageHeader>
      <PageContent className="flex-col lg:flex-row" padding="none">
        <div className="flex flex-1 px-6 pt-4">
          <FriendsList {...data} />
        </div>
        <div className="flex md:w-[360px]">
         <ActiveNowPanel />
        </div>
      </PageContent>
    </Page>
  );
};

export default MePage;
