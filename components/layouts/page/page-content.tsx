import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PageContentProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "md" | "lg";
}

export default function PageContent({
  padding,
  className,
  children,
  ...props
}: PageContentProps) {
  return (
    <div
      className={cn(
        "flex flex-1 lg:overflow-hidden",
        padding === "md" && "px-6 pt-4",
        padding === "lg" && "px-8 pt-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
