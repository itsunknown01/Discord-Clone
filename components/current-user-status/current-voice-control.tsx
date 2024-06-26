"use client";

import { BsGearFill, BsHeadphones, BsMicFill } from "react-icons/bs";
import CurrentVoiceButton from "@/components/current-user-status/current-voice-button";

interface CurrentVoiceControlProps {
  voiceStatus: {
    mute?: boolean;
    deaf?: boolean;
  };
  setVoiceStatus: (
    statusUpdater: (prev: { mute?: boolean; deaf?: boolean }) => {
      mute?: boolean;
      deaf?: boolean;
    }
  ) => void;
}

export default function CurrentVoiceControl({
  voiceStatus,
  setVoiceStatus,
}: CurrentVoiceControlProps) {
  return (
    <div className="flex items-center">
      <CurrentVoiceButton
        muted={voiceStatus.mute || voiceStatus.deaf}
        tooltipText={voiceStatus.mute || voiceStatus.deaf ? "Unmute" : "Mute"}
        onClick={() =>
          setVoiceStatus((prev) => ({
            ...prev,
            deaf: false,
            mute: !prev?.mute,
          }))
        }
        icon={<BsMicFill fontSize={18} />}
      />
      <CurrentVoiceButton
        muted={voiceStatus.deaf}
        tooltipText={voiceStatus.deaf ? "Undeaf" : "Deaf"}
        onClick={() =>
          setVoiceStatus((prev: { mute?: boolean; deaf?: boolean }) => ({
            ...prev,
            deaf: !prev.deaf,
          }))
        }
        icon={<BsHeadphones fontSize={20} />}
      />
      <CurrentVoiceButton
        tooltipText="Settings"
        icon={<BsGearFill fontSize={18} />}
      />
    </div>
  );
}
