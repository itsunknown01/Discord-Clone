import { ListedDMChannel } from "@/lib/mock-data/mock";
import { Friends } from "@prisma/client";
import { create } from "zustand";

type Channelstore = {
  channels: Friends[] | null;
  setChannels: (channels: Friends[]) => void;
};

export const useChannelStore = create<Channelstore>((set) => ({
  channels: null,
  setChannels: (channels) => set({ channels }),
}));
