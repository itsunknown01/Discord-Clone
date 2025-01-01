import React, { useEffect, useState } from "react";
import { BsSearch, BsXLg } from "react-icons/bs";
import Image from "next/image";

import { TabsContent } from "../ui/tabs";
import { FriendsTabEnum } from "@/constants/me-page";
import InputField from "../ui/input-field";
import { cn, normalizedCompare } from "@/lib/utils";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { List } from "../ui/list";
import MeFriendItem from "./me-friend-item";
import { UserStatus, UserStatusType } from "@/types";

interface MeFriendsContentItemProps {
  data: any[];
  tab: {
    id: FriendsTabEnum;
    title: string;
    name?: string;
    status?: UserStatus[];
    empty: {
      imageSrc: string;
      imageAlt: string;
      text: string;
    };
  };
}

const MeFriendsContentItem = ({ tab, data }: MeFriendsContentItemProps) => {
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState<any[]>([]);

  useEffect(() => {
    if (tab.id !== FriendsTabEnum.AddFriend) {
      setFilteredList(
        data.filter((user) => {
          const isMatchingName =
            !search || normalizedCompare(user.name, search);
          return (
            (tab.status ? tab.status.includes(user.status) : true) &&
            isMatchingName
          );
        })
      );
    }

    if (search !== "")
      setFilteredList(
        data.filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [data, search, tab.id, tab.status]);

  return (
    <TabsContent value={tab.id} key={tab.id}>
      {tab.id === FriendsTabEnum.AddFriend && (
        <div className="px-2 pb-5">
          <InputField
            endIcon={
              <>
                <BsSearch
                  className={cn(
                    "absolute right-0 transition-all",
                    search ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"
                  )}
                />
                <button
                  className={cn(
                    "absolute right-0 outline-none transition-all",
                    search ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                  )}
                  onClick={() => setSearch("")}
                >
                  <BsXLg />
                </button>
              </>
            }
          >
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-black bg-white"
            />
          </InputField>
        </div>
      )}

      <div className="mb-4 text-xs font-semibold uppercase text-gray-400">
        {tab?.title} — {filteredList?.length}
      </div>
      {!!filteredList.length ? (
        <ScrollArea>
          <List>
            {filteredList.map((friend: any) => (
              <MeFriendItem key={friend.id} tab={tab} friend={friend} />
            ))}
          </List>
        </ScrollArea>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-8 mt-2">
          <Image
            width={300}
            height={300}
            className="grayscale"
            src={tab.empty.imageSrc}
            alt={tab.empty.imageAlt}
          />
          <p className="text-gray-400 z-50">
            {search ? "Whooaps! No one found with this name" : tab.empty.text}
          </p>
        </div>
      )}
    </TabsContent>
  );
};

export default MeFriendsContentItem;
