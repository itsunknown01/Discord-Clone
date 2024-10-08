"use client";

import { ListItem } from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import StatusBadge from "@/components/ui/status-badge";

interface UserStatusProps {
  status: { value: string }[];
  handleSubmit: (status: string) => void;
  setOpen: (open: boolean) => void;
}

export default function UserStatuses({
  status,
  handleSubmit,
  setOpen,
}: UserStatusProps) {
  return (
    <div className="leading-[16px]">
      {status.map((status, index) => (
        <>
          <ListItem
            onClick={() => {
              setOpen(false), handleSubmit(status.value);
            }}
            className="group my-1 min-w-[180px] max-w-[380px] flex-col !items-start !rounded text-gray-300 hover:!bg-primary"
            key={index}
          >
            <div className="flex items-center">
              <StatusBadge
                customBackgroundColor="bg-black group-hover:!bg-primary"
                className="relative h-[9px]  w-[9px] !border-none group-hover:!bg-white"
                status={status.value}
              />
              <p className="ml-2">
                {status.value.charAt(0).toUpperCase() + status.value.slice(1)}
              </p>
            </div>
            <div className="ml-5 text-[12px]">
              {status.value === "offline" && (
                <p>
                  You won&apos;t appear as available, but you&apos;ll have
                  access to all Discord features.
                </p>
              )}
              {status.value === "dnd" && (
                <p>You will not receive desktop notifications.</p>
              )}
            </div>
          </ListItem>
          <Separator
            className={`my-2 h-[1px] w-full ${
              status.value === "online" ? "block" : "hidden"
            } `}
          />
        </>
      ))}
    </div>
  );
}