"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Profile } from "@prisma/client";
import { BsSearch, BsXLg } from "react-icons/bs";

import FriendListItem from "@/components/friends/friend-list-item";
import { FriendsEmptyBox } from "@/components/friends/friends-empty-box";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input-field";
import { List } from "@/components/ui/list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/hooks/redux/store";
import { FriendsTab, FriendsTabEnum } from "@/lib/friends";
import { cn, normalizedCompare } from "@/lib/utils";
import { FriendDataType } from "@/lib/types";

export default function FriendsListData({
  tab,
  data,
}: {
  tab: FriendsTab;
  data: FriendDataType[] | Profile[];
}) {
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState<
    FriendDataType[] | Profile[]
  >([]);

  const { currentTab } = useSelector((state: RootState) => state.data);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (currentTab !== FriendsTabEnum.AddFriend) {
      setFilteredList(
        data?.filter((user: any) => {
          const isMatchingName =
            !search || normalizedCompare(user.profile.name, search);

          return (
            (tab?.status ? tab?.status.includes(user.status) : true) &&
            isMatchingName
          );
        })
      );
    }

    if (search !== "") {
      setFilteredList(
        data.filter((user: any) =>
          user.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, search, tab.status, currentTab]);

  return (
    <>
      {!!data.length && (
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
              onChange={handleSearch}
              className="text-black"
            />
          </InputField>
          <div className="mt-6 text-xs font-semibold uppercase text-gray-400">
            {tab?.title} — {filteredList?.length}
          </div>
        </div>
      )}
      <ScrollArea>
        {!!filteredList?.length ? (
          <List>
            {filteredList.map((friend: any) => (
              <FriendListItem
                key={friend.id}
                tab={tab}
                friend={friend}
              />
            ))}
          </List>
        ) : (
          <FriendsEmptyBox
            src={tab?.empty.imageSrc as string}
            alt={tab?.empty.imageAlt as string}
            text={
              search
                ? "Whooaps! No one found with this name"
                : (tab?.empty.text as string)
            }
          />
        )}
      </ScrollArea>
    </>
  );
}
