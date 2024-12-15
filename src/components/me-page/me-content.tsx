import React from "react";
import { PageContent } from "../ui/page";
import MeFriendsContent from "./me-friends-content";
import { friends, profile } from "@/data";

const MeContent = () => {
  return (
    <PageContent className="flex-col lg:flex-row">
      <div className="flex flex-1 px-6 pt-4">
        <MeFriendsContent
          friends={friends}
          friendRequests={[]}
          users={Object.values(profile)}
        />
      </div>
    </PageContent>
  );
};

export default MeContent;
