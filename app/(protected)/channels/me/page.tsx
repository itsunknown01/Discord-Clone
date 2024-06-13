import FriendsTabs from "@/components/layouts/friends-tab";
import { Page, PageHeader } from "@/components/layouts/page";
import { Separator } from "@/components/ui/separator";
import { BsPersonFill } from "react-icons/bs";

const MePage = () => {
  return (
    <Page>
      <PageHeader>
        <div className="flex gap-4">
          <div className="flex flex-none items-center gap-2 text-sm font-semibold">
            <BsPersonFill className="text-gray-500" fontSize={22} />
            Friends
          </div>
          <Separator orientation="vertical" />
          <FriendsTabs />
        </div>
      </PageHeader>
    </Page>
  );
};

export default MePage;
