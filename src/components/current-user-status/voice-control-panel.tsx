"use client";

import { BsGearFill, BsHeadphones, BsMicFill } from "react-icons/bs";
import VoiceControlButton from "./voice-control-button";

interface VoiceControlPanelProps {
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

export default function VoiceControlPanel({
  voiceStatus,
  setVoiceStatus,
}: VoiceControlPanelProps) {
  return (
    <div className="flex items-center">
      <VoiceControlButton
        muted={voiceStatus.mute || voiceStatus.deaf}
        tooltipText={voiceStatus.mute || voiceStatus.deaf ? "Unmute" : "Mute"}
        onClick={() =>
          setVoiceStatus((prev) => ({
            ...prev,
            deaf: false,
            mute: !prev?.mute,
          }))
        }
        icon={
          <BsMicFill
            color={voiceStatus.mute || voiceStatus.deaf ? "red" : ""}
            fontSize={18}
          />
        }
      />
      <VoiceControlButton
        muted={voiceStatus.deaf}
        tooltipText={voiceStatus.deaf ? "Undeaf" : "Deaf"}
        onClick={() =>
          setVoiceStatus((prev: { mute?: boolean; deaf?: boolean }) => ({
            ...prev,
            deaf: !prev.deaf,
          }))
        }
        icon={
          <BsHeadphones
            color={voiceStatus.deaf ? "red" : ""}
            fontSize={20}
          />
        }
      />
      <VoiceControlButton
        tooltipText="Settings"
        icon={<BsGearFill fontSize={18} />}
      />
    </div>
  );
}
