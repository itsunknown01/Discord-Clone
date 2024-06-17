"use client";

import { Friends } from "@prisma/client";
import { useEffect, useState } from "react";

import { useFriendStore } from "@/hooks/customs/use-friends-store";
import {
  normalizedCompare
} from "@/lib/mock-data/mock";
import Avatar from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/input-field";
import { ListItem } from "@/components/ui/list";
import { PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface ConversationPopoverProps {
  position: string;
  setOpen: (isOpen: boolean) => void;
  friend?:Friends[]
}

const ConversationPopover = ({
  friend,
  position,
  setOpen,
  
}: ConversationPopoverProps) => {
  const {friends, setFriends} = useFriendStore();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchFriends = async () => {
      if (friend) setFriends(friend);
    };

    fetchFriends();
  }, [setFriends,friend]);

  const partFriends = friends?.slice(0, 6);

  const filterFriends = partFriends?.filter((user) => {
    return normalizedCompare(user.name, search);
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
            {/* {partFriends?.length} */}
          </p>
        </div>

        <InputField className="mt-4 px-4 h-16 border-none">
          <Input
            className=" placeholder:text-[14px] flex w-full justify-between rounded-sm bg-black p-1.5 text-left text-xs text-gray-400 hover:bg-black/70"
            placeholder="Enter your friend's username"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputField>

        <Separator className="mt-4 h-[1px] w-full bg-[#242628]" />

        <div className="h-[200px] max-w-[400px] overflow-y-auto px-2">
          {filterFriends?.length === 0 ? (
            <p className="w-full text-gray-400">
              No friends found who are currently not in this private
              conversation.
            </p>
          ) : (
            filterFriends?.map((friend, index) => (
              <ListItem key={index}>
                <Avatar
                  alt={friend.name}
                  src={friend.avatar}
                  status={friend.status}
                />
                <p className=" ml-2 mr-1 whitespace-nowrap text-[14px]  text-white">
                  {friend.name}
                </p>
                <p className="text-xs  text-gray-500">{friend.username}</p>
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
            className="w-full rounded bg-primary p-2 text-sm font-semibold transition-colors duration-300 ease-in-out hover:bg-[#4750b8]"
          >
            Create DM
          </button>
        </div>
      </>
    </PopoverContent>
  );
};

export default ConversationPopover;
