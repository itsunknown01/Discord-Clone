import { Hash } from "lucide-react";
import Avatar from "../ui/avatar";
import { PageHeader } from "@/components/ui/page";
import { Channel, Friends } from "@prisma/client";

interface ChatHeaderProps {
  user?: Friends | null;
  channel?: Channel | null;
  type: "direct" | "channel";
}

export default function ChatHeader({ user, channel, type }: ChatHeaderProps) {
  return (
    <PageHeader user={user}>
      <div className="flex items-center gap-4">
        <div className="flex flex-none items-center gap-3 text-sm font-semibold">
          {type === "direct" && (
            <>
              <Avatar
                size="sm"
                src={user?.avatar}
                alt="avatar"
                status={user?.status}
              />
              {user?.name}
            </>
          )}

          {type === "channel" && (
            <>
              <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
              {channel?.name}
            </>
          )}
        </div>
      </div>
    </PageHeader>
  );
}
