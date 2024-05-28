"use client";

import React from "react";
import StarBackground from "../background/star-background";
import CardWrapper from "./card-wrapper";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <CardWrapper>
      <StarBackground className="w-full h-full -z-20" />
      
      {children}
    </CardWrapper>
  );
}
