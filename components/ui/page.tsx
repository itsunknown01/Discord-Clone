import * as React from "react";
import { cn } from "@/lib/utils";

const Page = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col bg-zinc-700 shadow-lg shadow-zinc-700/5",
      className
    )}
    {...props}
  />
));

Page.displayName = "Page";

export { Page };