"use client";

import Link from "next/link";
import { BsDiscord } from "react-icons/bs";

import ActionTooltip from "../feature/action-tooltip";
import { cn } from "@/lib/utils";
import BorderedBadge from "../ui/border-badge";
import Image from "next/image";

interface SidebarMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  isActive?: boolean;
  className?: string;
  label: string;
  notificationCount?: number;
  image?: {
    url: string;
    alt: string;
  };
}

const SidebarMenuItem = ({
  isActive,
  className,
  label,
  notificationCount,
  image,
  ...props
}: SidebarMenuItemProps) => {
  const roundClasses = isActive
    ? "rounded-[15px]"
    : "rounded-full hover:rounded-[15px]";

  return (
    <ActionTooltip side="right" align="center" label={label}>
      <Link
        className={cn(
          "group relative flex h-12 w-12 bg-foreground bg-cover transition-all hover:shadow-xl",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background active:translate-y-[1px] hover:bg-blue-500",
          isActive ? "bg-blue-500" : "dark:bg-neutral-700",
          roundClasses,
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "absolute -left-4 w-[4px] rounded-lg bg-white",
            "transition-all group-hover:scale-100",
            isActive ? "bottom-1 top-1" : "top-1/2 -mt-3 h-6 scale-0"
          )}
        />
        <BorderedBadge
          className=" pointer-events-none z-10"
          count={notificationCount}
        />
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            unoptimized
            priority
            loader={({ src }) => `${src}`}
            className={cn(
              "absolute inset-0 transition-all object-contain w-full h-full",
              roundClasses
            )}
          />
        ) : (
          <BsDiscord fontSize={26} color="white" />
        )}
      </Link>
    </ActionTooltip>
  );
};

export default SidebarMenuItem;
