import { Users } from "@/lib/mock-data/mock";
import { Friends } from "@prisma/client";
import { create } from "zustand";

type FriendStore = {
  friends: Friends[] | null;
  setFriends: (friends: Friends[]) => void;
};

export const useFriendStore = create<FriendStore>((set) => ({
  friends: null,
  setFriends: (friends) => set({ friends }),
}));
