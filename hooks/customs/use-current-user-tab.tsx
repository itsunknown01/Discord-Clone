import { Users } from "@/lib/mock-data/mock";
import { create } from "zustand";

interface CurrentUserState {
  currentUser: Users | null;
  setCurrentUser: (user: Users | null) => void;
}
export const useCurrentUserStore = create<CurrentUserState>()((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));