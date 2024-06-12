"use client";

import { useModal } from "@/hooks/customs/use-modal";
import React from "react";

const FindChatButton = () => {
  const { onOpen } = useModal();
  return (
    <button
      onClick={() => onOpen("searchModal")}
      className="flex w-full justify-between rounded-sm bg-black p-1.5 text-left text-xs text-gray-400 hover:bg-black/70"
    >
      Find your friends & chats
      <div className="rounded-sm bg-gray-800/50 px-1 text-[11px]">Ctrl K</div>
    </button>
  );
};

export default FindChatButton;
