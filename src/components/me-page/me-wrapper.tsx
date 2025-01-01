"use client";

import React from "react";
import { Tabs } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { FriendsTabEnum } from "@/constants/me-page";
import { Page } from "../ui/page";
import { useTabStore } from "@/hooks/use-tab-store";

const MeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { setCurrentTab, currentTab } = useTabStore();
  return (
    <Page>
      <Tabs
        className={cn("flex flex-col h-screen")}
        value={currentTab}
        onValueChange={(tab) => setCurrentTab(tab as FriendsTabEnum)}
        defaultValue="Online"
      >
        {children}
      </Tabs>
    </Page>
  );
};

export default MeWrapper;
