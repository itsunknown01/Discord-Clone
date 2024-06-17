import { Hash } from "lucide-react";
import Avatar from "../ui/avatar";
import PageHeader from "@/components/layouts/page/page-header"

export default function ChatHeader () {
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
                    {name}
                  </>
                )}
              </div>
            </div>
          </PageHeader>
    )
}