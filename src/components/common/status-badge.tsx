import { UserStatusType } from "@/hooks/use-tab-store";
import { cn } from "@/lib/utils";
import {  } from "@/types";
import { MdPhoneAndroid } from "react-icons/md";

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: UserStatusType | "skeleton" | string;
  customBackgroundColor?: string;
}

export default function StatusBadge({
  status,
  className,
  customBackgroundColor = "bg-midground",
  ...props
}: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border-[3px]",
        status === "Online" && "bg-green-600",
        status === "Offline" && "bg-gray-500",
        status === "DND" && "bg-red-600",
        status === "Idle" && "bg-yellow-600",
        status === "skeleton"
          ? "border-gray-900 bg-gray-900"
          : "border-midground",
        status !== "Mobile" && "h-[15px] w-[15px]",
        status === "Mobile" &&
          "h-[18px] w-3.5 rounded-sm bg-midground text-green-600",
        className
      )}
      {...props}
    >
      {status === "Offline" && (
        <div className="h-1.5 w-1.5 rounded-full bg-midground"></div>
      )}
      {status === "DND" && (
        <div className="h-0.5 w-1.5 rounded-sm bg-midground"></div>
      )}
      {status === "Idle" && (
        <div
          className={`absolute -left-0.5 -top-0.5 h-2 w-2 rounded-full ${customBackgroundColor} `}
        ></div>
      )}
      {status === "Mobile" && (
        <MdPhoneAndroid fontSize={15} className="flex-none" />
      )}
    </div>
  );
}
