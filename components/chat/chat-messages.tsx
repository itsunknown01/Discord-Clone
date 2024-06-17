"use client";

import { Server, Friends } from "@prisma/client";
import UserProfileInfo from "../channels/user-profile-info";
import { Separator } from "../ui/separator";
import { MessageBox } from "../channels/message-box";
import { useCurrentUserStore } from "@/hooks/customs/use-current-user-tab";

interface ChatMessagesProps {
  user?: Friends | null;
  server?: Server | null
  type: "channel" | "direct";
}

export default function ChatMessages({ user, type,server }: ChatMessagesProps) {
  const { currentUser } = useCurrentUserStore();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDate.getFullYear()}`;

  return (
    <div className="!overflow-y-auto flex flex-col min-h-0 mb-4">
      <UserProfileInfo
        user={user}
        server={server}
        handleAddDelete={() => {}}
        isFriend
        type={type}
      />
      <div className="flex items-center mx-6 mt-6">
        <Separator className="h-[1px] w-[45%] bg-white" />
        <p className="flex  whitespace-nowrap px-1 text-xs font-semibold text-gray-400">
          {formattedDate}
        </p>
        <Separator className="h-[1px] w-[48%] bg-white" />
      </div>
      <MessageBox
        messages={[
          {
            id: 1,
            userId: user?.id,
            text: "Hello! How are you?",
            timestamp: new Date().toISOString(),
          },
        ]}
        user={user}
        currentUser={currentUser}
      />
    </div>
  );
}
