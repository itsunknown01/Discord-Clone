"use client"

import FriendActiveNowList from "@/components/friends/friend-active-list"

export default function FriendActivePanel() {
    return (
        <div className="flex-1 border-l-[1px] border-gray-800 p-4">
      <h1 className="mb-4 text-lg  font-extrabold">Active Now</h1>
      <FriendActiveNowList />
        </div>
    )
}