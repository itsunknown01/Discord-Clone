"use client";

import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { BsPersonFill, BsShop, BsStars } from "react-icons/bs";

import { ListItem } from "@/components/ui/list";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/badge";

type MenuItemProps = {
  icon: ReactNode;
  name: ReactNode;
  count?: number;
  children?: never;
} & ComponentProps<typeof ListItem>;

const MenuItem = ({
  className,
  icon,
  name,
  count,
  ...props
}: MenuItemProps) => {
  return (
    <ListItem
      className={cn("my-0.5 justify-between py-2.5", className)}
      noVerticalPadding
      {...props}
    >
      <span className="inline-flex items-center gap-3">
        {icon}
        {name}
      </span>
      <Badge count={count} />
    </ListItem>
  );
};

export default function ConversationMenu() {
  const pathname = usePathname();
  return (
    <div className="w-full">
      <MenuItem
        href={"/channels/me"}
        active={pathname == "/channels/me"}
        icon={<BsPersonFill fontSize={20} />}
        name="Friends"
        count={24}
      />
      <MenuItem
        href={"/nitro"}
        active={pathname == "/nitro"}
        icon={<BsStars fontSize={20} />}
        name="Nitro"
        count={0}
      />
      <MenuItem
        href={"/shop"}
        active={pathname == "/shop"}
        icon={<BsShop fontSize={20} />}
        name="Shop"
        count={0}
      />
    </div>
  );
}