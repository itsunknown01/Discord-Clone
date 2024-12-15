"use client";

import React from "react";
import { Tabs } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { FriendsTabEnum } from "@/constants/me-page";
import { Page } from "../ui/page";

const MeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Page>
      <Tabs
        className={cn("flex flex-col h-screen")}
        // value={currentTab}
        //   onValueChange={(tab) => dispatch(setCurrentTab(tab as FriendsTabEnum))}
        defaultValue="Online"
      >
        {children}
      </Tabs>
    </Page>
  );
};

export default MeWrapper;
