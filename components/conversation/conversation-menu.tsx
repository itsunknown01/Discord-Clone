"use client";

import React, { ComponentProps, ReactNode } from "react";
import { List, ListItem } from "../ui/list";
import { cn } from "@/lib/utils";
import { BsPersonFill, BsShop, BsStars } from "react-icons/bs";
import Badge from "../ui/badge";
import { usePathname } from "next/navigation";

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

const ConversationMenu = () => {
  const pathname = usePathname();
  return (
    <List className="w-full">
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
    </List>
  );
};

export default ConversationMenu;