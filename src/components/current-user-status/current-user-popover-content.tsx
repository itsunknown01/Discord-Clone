"use client";

import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";

import UserAvatar from "../common/user-avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { PopoverContent } from "../ui/popover";
import { ListItem } from "../ui/list";
import StatusBadge from "../common/status-badge";
import { Separator } from "../ui/separator";
import { Profile } from "@/types";
import { Edit } from "lucide-react";

const CurrentUserPopoverContent = ({
  currentUser,
}: {
  currentUser: Profile;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <PopoverContent
      side="top"
      className="relative left-12 !w-full border-none bg-black md:min-w-72 p-0 text-white"
    >
      <div className=" h-[105px] w-full rounded-t-md bg-gray-300" />
      <UserAvatar
        className="relative -top-4 left-8 scale-[2] ring-[3px] ring-[#1e1f22]"
        src={currentUser.imageUrl}
        alt={currentUser.name}
        status={currentUser.status}
      />
      <div className="mx-4 mt-4">
        <p className="text-lg font-semibold">{currentUser?.name}</p>
        <p className="text-xs">{currentUser?.username}</p>
      </div>
      <div className="relative mt-6 rounded-lg bg-zinc-800/80 m-4 p-1">
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <div className="flex flex-col px-1">
              <ListItem className="group mt-2 flex items-center space-x-2 !rounded !py-2 text-gray-200 active:!bg-primary">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </ListItem>
              <ListItem className="group mt-2 flex items-center justify-between space-x-2 !rounded !py-1 text-gray-200 active:!bg-primary">
                <div className=" flex items-center justify-center">
                  <StatusBadge
                    className="relative !border-black group-hover:!border-foreground group-active:!border-primary"
                    customBackgroundColor="!bg-black group-hover:!bg-foreground group-active:!bg-primary"
                    status={currentUser.status as string}
                  />
                  <p className="ml-2">{currentUser.status}</p>
                </div>
                <AiOutlineRight size="10" className="justify-self-end" />
              </ListItem>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="!relative left-6 !text-sm border-none bg-black"
            sideOffset={0}
          >
            {/* <UserStatuses
            setOpen={setOpen}
            handleSubmit={handleSubmit}
            status={statuses}
          /> */}
          </TooltipContent>
        </Tooltip>
        {/* <DialogContentMain
        currentUser={currentUser}
        handleSubmit={handleSubmit}
        statuses={statuses}
      /> */}
        <Separator className="h-[1px] w-full" />
        {/* <PopoverContentSub
        hoverPopover={hoverPopover}
        setHoverPopover={setHoverPopover}
        currentUser={currentUser}
      /> */}
      </div>
    </PopoverContent>
  );
};

export default CurrentUserPopoverContent;
