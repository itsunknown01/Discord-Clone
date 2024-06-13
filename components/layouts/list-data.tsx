"use client";

import { FriendsTab } from "@/lib/mock-data/friends";
import { User, normalizedCompare } from "@/lib/mock-data/mock";
import InputField from "../ui/input-field";
import { ChangeEvent, useMemo, useState } from "react";
import { BsSearch, BsXLg } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { List } from "../ui/list";
import FriendListItem from "./friend-list-item";
import { EmptyBox } from "./empty-box";

interface ListDataProps {
  tab?: FriendsTab;
  data?: User[];
}

export default function ListData({ tab, data }: ListDataProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredList = 
      data?.filter((user) => {
        const isMatchingName = !search || normalizedCompare(user.name, search);
        return (
          (tab?.status ? tab?.status.includes(user.status) : true) &&
          isMatchingName
        );
      })
  return (
    <>
      {!!data?.length && (
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
            />
          </InputField>
          <div className="mt-6 text-xs font-semibold uppercase text-gray-400">
            {tab?.title} — {filteredList?.length}
          </div>
        </div>
      )}
      <div>
        {!!filteredList?.length ? (
          <List>
            {filteredList.map((friend) => (
              <FriendListItem key={friend.id} tab={tab as FriendsTab} friend={friend} />
            ))}
          </List>
        ) : (
          <EmptyBox
            src={tab?.empty.imageSrc as string}
            alt={tab?.empty.imageAlt as string}
            text={
              search
                ? "Whooaps! No one found with this name"
                : (tab?.empty.text as string)
            }
          />
        )}
      </div>
    </>
  );
}
