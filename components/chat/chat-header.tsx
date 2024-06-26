"use client";

import { useState } from "react";
import Avatar from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page";

export default function ChatHeader({ conversation }: { conversation: any }) {
  const [showAudioVideoCall, setShowAudioVideoCall] = useState(false);
  const handleAudioVideoCall = () => {
    if (conversation) {
      setShowAudioVideoCall(true);
    }
  };
  return (
    <PageHeader
      user={conversation}
      handleAudioCall={handleAudioVideoCall}
      showAudioVideoCall={showAudioVideoCall}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-none items-center gap-3 text-sm font-semibold">
          <Avatar
            size="sm"
            src={conversation?.profile.imageUrl}
            alt="avatar"
            status={conversation?.status}
          />
          {conversation?.profile.name}
        </div>
      </div>
    </PageHeader>
  );
}
