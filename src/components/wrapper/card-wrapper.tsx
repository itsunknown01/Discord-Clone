"use client";

import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export default function CardWrapper({ children, className }: CardWrapperProps) {
  return (
    <Card
      className={cn(
        "w-screen h-screen lg:h-min lg:max-w-[764px] shadow-md lg:rounded-lg rounded-none",
        className
      )}
    >
      {children}
    </Card>
  );
}
