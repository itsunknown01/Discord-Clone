import { cn } from "@/lib/utils";
import { MdPhoneAndroid } from "react-icons/md";
import { UserStatus } from "@prisma/client";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: UserStatus | "skeleton" | string;
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
        status === UserStatus.Online && "bg-green-600",
        status === UserStatus.Offline && "bg-gray-500",
        status === UserStatus.DND && "bg-red-600",
        status === UserStatus.Idle && "bg-yellow-600",
        status === "skeleton"
          ? "border-gray-900 bg-gray-900"
          : "border-midground",
        status !== UserStatus.Mobile && "h-[15px] w-[15px]",
        status === UserStatus.Mobile &&
          "h-[18px] w-3.5 rounded-sm bg-midground text-green-600",
        className,
      )}
      {...props}
    >
      {status === UserStatus.Offline && (
        <div className="h-1.5 w-1.5 rounded-full bg-midground"></div>
      )}
      {status === UserStatus.DND && (
        <div className="h-0.5 w-1.5 rounded-sm bg-midground"></div>
      )}
      {status === UserStatus.Idle && (
        <div
          className={`absolute -left-0.5 -top-0.5 h-2 w-2 rounded-full ${customBackgroundColor} `}
        ></div>
      )}
      {status === UserStatus.Mobile && (
        <MdPhoneAndroid fontSize={15} className="flex-none" />
      )}
    </div>
  );
}