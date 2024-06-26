"use client";

import { useState } from "react";

import { PopoverContent } from "@/components/ui/popover";
import { normalizedCompare } from "@/lib/utils";
import InputField from "../ui/input-field";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ListItem } from "../ui/list";
import Avatar from "../ui/avatar";

interface ConversationPopoverProps {
  friends?: any[];
  position: string;
  setOpen: (isOpen: boolean) => void;
}

export default function ConversationPopover({
  friends,
  position,
  setOpen,
}: ConversationPopoverProps) {
  const [search, setSearch] = useState<string>("");

  const partFriends = friends?.slice(0, 6);

  const filterFriends = partFriends?.filter((user) => {
    return normalizedCompare(user?.profile.name, search);
  });

  return (
    <PopoverContent
      className={`relative ${position} !w-full border-[1px] border-[#242628] bg-[#313338] !px-0 md:min-w-[400px]`}
    >
      <>
        <div className="flex flex-col px-4">
          <h2 className="font-bold">Select Friends</h2>
          <p className="text-[12px] text-gray-300">
            you can add 0 more friends
            {partFriends?.length}
          </p>
        </div>

        <InputField className="mt-4 px-4 h-16 border-none">
          <Input
            className=" placeholder:text-[14px] flex w-full justify-between rounded-sm border-none bg-black p-1.5 text-left text-xs text-gray-400 hover:bg-black/70"
            placeholder="Enter your friend's username"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputField>

        <Separator className="my-4 h-[1px] w-full bg-[#242628]" />

        <div className="max-h-[200px] max-w-[400px] overflow-y-auto px-2 hover-scrollbar">
          {filterFriends?.length === 0 ? (
            <p className="ml-2 w-full text-gray-400">
              No friends found who are currently not in this private
              conversation.
            </p>
          ) : (
            filterFriends?.map((friend, index) => (
              <ListItem key={index}>
                <Avatar
                  alt={friend?.profile.name}
                  src={friend?.profile.imageUrl}
                  status={friend.status}
                />
                <p className="ml-2 mr-1 whitespace-nowrap text-[14px]  text-white">
                  {friend?.profile.name}
                </p>
                <p className="text-xs  text-gray-500">
                  {friend?.profile.username}
                </p>
              </ListItem>
            ))
          )}
        </div>

        <div className="px-4">
          <Separator className="mb-4 h-[1px]" />
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="w-full rounded bg-[#4750b8] p-2 text-sm font-semibold transition-colors duration-300 ease-in-out"
          >
            Create DM
          </button>
        </div>
      </>
    </PopoverContent>
  );
}
