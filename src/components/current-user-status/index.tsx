"use client";

import { Profile, VoiceStatus } from "@/types";
import UserAvatar from "../common/user-avatar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { TooltipProvider } from "../ui/tooltip";
import CurrentUserPopoverContent from "./current-user-popover-content";
import VoiceControlPanel from "./voice-control-panel";
import { useState } from "react";

const CurrentUserStatus = ({ profile }: { profile: Profile }) => {
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>({ mute: true });

  return (
    <TooltipProvider>
      <Popover>
        <div className="flex justify-between gap-1 bg-[#1E1F22] px-2 py-1.5 flex-wrap">
          <PopoverTrigger asChild>
            <button className="flex gap-2 rounded-md py-1 pl-0.5 pr-2 text-left leading-tight hover:bg-white/20">
              <UserAvatar src={profile.imageUrl} alt={profile.name} status={profile.status} />
              <div>
                <div className="text-xs font-semibold text-gray-300">
                  {profile?.username?.slice(0, 9)}...
                </div>
                <div className="text-[11px] text-gray-300">
                  {`${profile.status}`}
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <VoiceControlPanel
            voiceStatus={voiceStatus}
            setVoiceStatus={setVoiceStatus}
          />
        </div>  
        <CurrentUserPopoverContent currentUser={profile} />
      </Popover>
    </TooltipProvider>
  );
};

export default CurrentUserStatus;
