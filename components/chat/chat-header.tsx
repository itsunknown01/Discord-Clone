"use client";

import { useMemo, useState } from "react";
import Avatar from "@/components/ui/avatar";
import { PageHeader } from "@/components/ui/page";
import { useSocket } from "@/hooks/context/use-socket-context";
import { UserStatus } from "@prisma/client";
import { Hash } from "lucide-react";

interface ChatHeaderProps {
  conversation: any;
  type: "channel" | "conversation";
  name?: string
}

export default function ChatHeader({ conversation, type,name }: ChatHeaderProps) {
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
      <div className="flex items-center gap-4 text-white">
        <div className="flex flex-none items-center gap-3 text-sm font-semibold">
          {type === "channel" && <Hash className="w-5 h-5 text-zinc-400" />}
          {type === "conversation" && (
            <Avatar
              size="sm"
              src={conversation?.imageUrl}
              alt="avatar"
              status={!isOnline ? UserStatus.Offline : UserStatus.Online}
            />
          )}
          {type === "channel" ? name : conversation?.name}
        </div>
      </div>
    </PageHeader>
  );
}
