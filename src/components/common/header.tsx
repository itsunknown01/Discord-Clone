"use client";

import { cn } from "@/lib/utils";
import React, { HTMLAttributes, LegacyRef } from "react";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  verticalPadding?: string;
  ref?: LegacyRef<HTMLDivElement>;
}

export function Header({
  verticalPadding = "px-4",
  className,
  ref,
  ...props
}: HeaderProps) {
  return (
    <div
      ref={ref}
      className={cn(
        `flex h-12 items-center shadow-md`,
        className,
        verticalPadding
      )}
      {...props}
    />
  );
}
