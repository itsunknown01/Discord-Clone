import { FriendsTabEnum } from "@/constants/me-page";
import { create } from "zustand";

export type UserStatusType =
  | "Online"
  | "DND"
  | "Idle"
  | "Mobile"
  | "Blocked"
  | "Offline";

interface TabState {
  currentTab: FriendsTabEnum;
  setCurrentTab: (currentTab: FriendsTabEnum) => void;
}

export const useTabStore = create<TabState>((set) => ({
  currentTab: FriendsTabEnum.Online,
  setCurrentTab: (currentTab) => set({ currentTab }),
}));
