"use client";

import React, { useState } from "react";
import { TooltipProvider } from "../ui/tooltip";
import { FriendsTabEnum, friendsTabs } from "@/constants/me-page";
import { TabsContent } from "../ui/tabs";
import InputField from "../ui/input-field";
import { cn } from "@/lib/utils";
import { BsSearch, BsXLg } from "react-icons/bs";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { List } from "../ui/list";
import Image from "next/image";
import MeFriendItem from "./me-friend-item";

interface FriendListProps {
  friends: any[];
  friendRequests: any[];
  users: any[];
}

const MeFriendsContent = ({
  friends,
  friendRequests,
  users,
}: FriendListProps) => {
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState<any[]>([]);
  return (
    <div className="flex flex-1 flex-col">
      <TooltipProvider>
        {friendsTabs.map((tab) => (
          <TabsContent value={tab.id} key={tab.id}>
            {tab.id === FriendsTabEnum.AddFriend && (
              <div className="px-2 pb-5">
                <InputField
                  endIcon={
                    <>
                      <BsSearch
                        className={cn(
                          "absolute right-0 transition-all",
                          search
                            ? "-rotate-90 opacity-0"
                            : "rotate-0 opacity-100"
                        )}
                      />
                      <button
                        className={cn(
                          "absolute right-0 outline-none transition-all",
                          search
                            ? "rotate-0 opacity-100"
                            : "rotate-90 opacity-0"
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
                <div className="mt-6 text-xs font-semibold uppercase text-gray-400">
                  {tab?.title} — {filteredList?.length}
                </div>
              </div>
            )}

            {!!filteredList.length ? (
              <ScrollArea>
                <List>
                  {filteredList.map((friend) => (
                    <MeFriendItem key={friend.id} tab={tab} friend={friend} />
                  ))}
                </List>
              </ScrollArea>
            ) : (
              <div className="flex h-full flex-1 flex-col items-center justify-center gap-8 mt-2">
                <Image
                  width={300}
                  height={300}
                  className="grayscale"
                  src={tab.empty.imageSrc}
                  alt={tab.empty.imageAlt}
                />
                <p className="text-gray-400 z-50">
                  {search
                    ? "Whooaps! No one found with this name"
                    : tab.empty.text}
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default MeFriendsContent;
