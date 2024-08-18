"use client";

import { Member, Profile } from "@prisma/client";

interface ChannelVideoProps {
  currentUser: Profile;
  members: Member[];
}

export default function ChannelVideo({
  currentUser,
  members,
}: ChannelVideoProps) {
  return (
    <div>
      <h1>Channel Video</h1>
    </div>
  );
}
