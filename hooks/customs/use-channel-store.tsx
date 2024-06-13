import { ListedDMChannel } from "@/lib/mock-data/mock";
import { create } from "zustand";

type Channelstore = {
  channels: ListedDMChannel[] | null;
  setChannels: (channels: ListedDMChannel[]) => void;
};

export const useChannelStore = create<Channelstore>((set) => ({
  channels: null,
  setChannels: (channels) => set({ channels }),
}));
