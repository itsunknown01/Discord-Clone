"use client";

import { useMemo, useState } from "react";
import Avatar from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page";
import { useSocket } from "@/hooks/context/use-socket-context";
import { UserStatus } from "@prisma/client";

export default function ChatHeader({ conversation }: { conversation: any }) {
  const [showAudioVideoCall, setShowAudioVideoCall] = useState(false);
  
  const { onlineUsers } = useSocket();

  const handleAudioVideoCall = () => {
    if (conversation) {
      setShowAudioVideoCall(true);
    }
  };

  const isOnline = useMemo(() => {
    return onlineUsers.some((user) => user.userId === conversation.id);
  }, [conversation.id, onlineUsers]);

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
            src={conversation?.imageUrl}
            alt="avatar"
            status={!isOnline ? UserStatus.Offline : UserStatus.Online}
          />
          {conversation?.name}
        </div>
      </div>
    </PageHeader>
  );
}
