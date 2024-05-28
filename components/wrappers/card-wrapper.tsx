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
    <Card className={cn("max-w-[480px] shadow-md", className)}>{children}</Card>
  );
}
