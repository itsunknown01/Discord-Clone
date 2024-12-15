"use client";

import React from "react";
import UserAvatar from "../common/user-avatar";
import { cn } from "@/lib/utils";

interface UserProfileInfoProps {
  user: any;
  handleAddDelete: (type: "add" | "delete") => void;
  isFriend: boolean | undefined;
  isChannel?: boolean;
}

export function ChatUserInfo({
  user,
  handleAddDelete,
  isFriend,
  isChannel = false,
}: UserProfileInfoProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        isChannel && "items-center justify-center"
      )}
    >
      {!isChannel && (
        <UserAvatar
          className=" relative left-4 top-4 mb-12 scale-[2]"
          src={user?.imageUrl}
          alt="avatar"
        />
      )}
      <p
        className={cn(
          "text-3xl font-bold",
          isChannel && "flex flex-col text-center mb-2"
        )}
      >
        {isChannel ? (
          <>
            <span>Welcome to </span>
            {user.name}
          </>
        ) : (
          user?.profile.name
        )}
      </p>
      {!isChannel && (
        <p className="my-2 text-xl font-semibold"> {user?.profile.username}</p>
      )}
      <span className={cn("text-base text-gray-300", isChannel && "mb-6")}>
        {isChannel ? (
          "This is the beginning of this server"
        ) : (
          <>
            This is the beginning of your story with
            <span className="ml-1 font-semibold text-gray-200">
              {user?.profile.name}
            </span>
          </>
        )}
      </span>
      {!isChannel && (
        <div className="my-4 flex h-fit items-center gap-4 text-[14px]">
          <p>no shared servers</p>
          <button
            onClick={() => {
              handleAddDelete(isFriend ? "delete" : "add");
            }}
            className={`duration-400 ${
              isFriend
                ? "bg-gray-600 hover:bg-gray-500"
                : "bg-blue-500 hover:bg-blue-600"
            } rounded px-3 py-0.5 transition-colors ease-in-out `}
          >
            {isFriend ? " Delete Friend" : "Add Friend"}
          </button>
          <button className="duration-400 rounded bg-gray-600 px-3 py-0.5 transition-colors ease-in-out hover:bg-gray-500">
            Block
          </button>
        </div>
      )}
    </div>
  );
}
