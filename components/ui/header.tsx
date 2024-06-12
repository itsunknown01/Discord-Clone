"use client";

import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  verticalPadding?: string;
}

export default function Header({
  verticalPadding = "px-4",
  className,
  ...props
}: HeaderProps) {
  return (
    <div
      className={cn(
        `flex h-12 items-center shadow-md`,
        className,
        verticalPadding
      )}
      {...props}
    />
  );
}
