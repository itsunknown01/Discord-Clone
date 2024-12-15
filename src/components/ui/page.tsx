"use client";

import { cn } from "@/lib/utils";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  HTMLAttributes,
} from "react";
import { Header } from "../common/header";

const Page = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col bg-zinc-800/90 shadow-lg shadow-zinc-700/5 h-screen",
        className
      )}
      {...props}
    />
  )
);

Page.displayName = "Page";

const PageHeader = forwardRef<
  ElementRef<typeof Header>,
  ComponentPropsWithoutRef<typeof Header> & {
    showAudioVideoCall?: boolean;
  }
>(({ className, showAudioVideoCall, ...props }, ref) => (
  <Header
    ref={ref}
    className={cn(
      `flex-none justify-between ${
        showAudioVideoCall ? "text-[#000000]" : ""
      } transition-colors duration-200 ease-in-out `,
      className
    )}
    {...props}
  />
));

PageHeader.displayName = "PageHeader";

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "md" | "lg";
}

const PageContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ padding, className, ...props }: PageContentProps, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex lg:overflow-hidden",
        padding === "md" && "px-6 pt-4",
        padding === "lg" && "px-8 pt-6",
        className
      )}
      {...props}
    />
  )
);

PageContent.displayName = "PageContent";

export { Page, PageHeader, PageContent };