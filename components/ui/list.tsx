import React from "react";

import { cn } from "@/lib/utils";
import HybridButton, { HybridButtonProps } from "@/components/ui/hybrid-button";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {}

const List = ({ children, className, ...props }: ListProps) => {
  return (
    <ul className={cn(className)} {...props}>
      {children}
    </ul>
  );
};

export type ListItemProps = {
  active?: boolean;
  noVerticalPadding?: boolean;
} & HybridButtonProps;
const ListItem = React.forwardRef(
  (
    { active, noVerticalPadding, className, ...props }: ListItemProps,
    ref: React.Ref<HTMLLIElement>
  ) => {
    return (
      <li className="list-none" ref={ref}>
        <HybridButton
          className={cn(
            "flex items-center rounded-md pl-3 pr-2 text-[15px] hover:bg-gray-800/50",
            "w-full text-left hover:text-gray-100 active:text-white active:bg-gray-800/50",
            "focus-visible:ring-0 focus-visible:bg-gray-800/50 focus-visible:text-gray-100",
            noVerticalPadding ? "" : "py-2",
            active ? "text-gray-100 bg-gray-700/60" : "text-gray-400",
            className
          )}
          {...props}
        />
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export { List, ListItem };
