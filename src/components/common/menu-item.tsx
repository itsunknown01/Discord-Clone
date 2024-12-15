import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";
import { ListItem } from "../ui/list";
import BadgeCount from "./badge-count";

type MenuItemProps = {
  icon: ReactNode;
  name: ReactNode;
  count?: number;
  children?: never;
} & ComponentProps<typeof ListItem>;

export const MenuItem = ({
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
      <BadgeCount count={count} />
    </ListItem>
  );
};
