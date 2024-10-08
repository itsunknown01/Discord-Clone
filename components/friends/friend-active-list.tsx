"use client";

import Avatar from "@/components/ui/avatar";
import { List, ListItem } from "@/components/ui/list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { RootState } from "@/hooks/redux/store";
import { calculateHoursBetweenDates } from "@/lib/utils";
import { ActivityType, UserStatus } from "@prisma/client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { useAddChannel } from "@/hooks/customs/use-add-channel";

export const ActiveNowListItemSkeleton = () => (
  <div className="h-[70px] animate-pulse rounded-md bg-gray-900"></div>
);

export default function FriendActiveNowList() {
  const {friends} = useSelector((state: RootState) => state.data)
  const { handleAddChannel, setSelectedFriend } = useAddChannel();
  if (friends === null) {
    return <ActiveNowListItemSkeleton />;
  }

  const filteredList = friends.filter(
    (friend) =>
      friend.activity &&
      friend.activity.type === ActivityType.Playing &&
      friend.status !== UserStatus.Offline
  );

  return filteredList.length ? (
    <List>
      {filteredList.map((friend) => (
        <TooltipProvider key={friend.id}>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <ListItem
                noVerticalPadding
                className="group  gap-3 border-[1px] border-gray-800  bg-midground p-4"
              >
                <Avatar
                  src={friend.profile?.imageUrl as string}
                  alt={friend.profile?.name as string}
                  status={friend.status}
                  className="w-8 flex-none"
                />
                <div className="flex-1 truncate text-sm">
                  <span className="text-gray-100">{friend.profile?.name}</span>
                  {friend.activity && (
                    <div className="h-4 truncate text-xs leading-3">
                      {friend.activity.type} -
                      {calculateHoursBetweenDates(
                        friend.activity.since,
                        new Date()
                      )}
                      hours
                    </div>
                  )}
                </div>
                <Image
                  className=" aspect-square  object-contain"
                  width={24}
                  height={24}
                  alt={`logo {friend.activity.name} `}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlvnzzC2oPp5U3HelWw286q48kMHcsjW9rC7Tlni7T-0amCpHLvDiqZVidP2Ony0X7tSA&usqp=CAU"
                />
              </ListItem>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              sideOffset={15}
              className="p-2 text-xs leading-3 md:w-[200px]"
            >
              <div className="flex w-full flex-col items-end justify-center ">
                <p
                  onClick={() => {
                    setSelectedFriend(friend);
                    handleAddChannel();
                  }}
                  className="flex h-8 w-full cursor-pointer items-center rounded px-2 transition-colors duration-300 ease-in-out hover:bg-blue-600"
                >
                  Message
                </p>
                <Separator className="my-1 w-full" />
                <div className="flex w-full items-center rounded  px-2 transition-colors duration-300 ease-in-out hover:bg-blue-600">
                  <Avatar
                    src={friend.profile?.imageUrl as string}
                    alt={friend.profile?.name as string}
                    status={friend.status}
                    className="mr-2 !w-6 flex-none"
                  />
                  <p> {friend.profile?.name}</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </List>
  ) : (
    <div className="w-full p-4 text-center">
      <div className=" mb-4 font-bold">quiet for now...</div>
      <span className="text-sm">
        When friends start some activity - like playing games or spending time
        on the voice channel - we will show it here
      </span>
    </div>
  );
}