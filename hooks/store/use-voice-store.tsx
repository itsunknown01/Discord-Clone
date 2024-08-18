import { Channel } from "@prisma/client";
import { create } from "zustand";

interface VoiceState {
  channel: Channel | null;
  activeVoice: boolean;
  setActiveVoice: (activeVoice: boolean,data?: Channel | null) => void;
}

export const useVoiceStore = create<VoiceState>((set) => ({
  activeVoice: false,
  channel: null,
  setActiveVoice: (activeVoice, data=null) => set({ activeVoice: !activeVoice, channel: data }),
}));
