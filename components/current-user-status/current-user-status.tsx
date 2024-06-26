"use client"

import { Profile } from "@prisma/client";
import { useEffect, useState } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import Avatar from "@/components/ui/avatar";
import { VoiceStatus } from "@/lib/types";
import CurrentVoiceControl from "@/components/current-user-status/current-voice-control";
import CurrentPopoverMain from "@/components/current-user-status/current-popover-main";

export default function CurrentUserStatus({profile}: {profile: Profile}) {
    const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>({ mute: true });
    const [currentUser, setCurrentUser] = useState<Profile>({
      id: "",
      username: "",
      email: "",
      name: "",
      userId: "",
      imageUrl: "",
      status: "Offline",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    useEffect(() => {
      if (currentUser !== null) {
        setCurrentUser(profile);
      }
    }, [currentUser, profile]);
    
    return (
      <TooltipProvider>
        <Popover>
          <div className="flex justify-between gap-1 bg-[#1E1F22] px-2 py-1.5">
            <PopoverTrigger asChild>
              <button className="flex gap-2 rounded-md py-1 pl-0.5 pr-2 text-left leading-tight hover:bg-white/20">
                <Avatar src={profile.imageUrl} alt={profile.name} />
                <div>
                  <div className="text-xs font-semibold">{profile.username}</div>
                  <div className="text-[11px] text-gray-300">
                    {`${profile.status}`}
                  </div>
                </div>
              </button>
            </PopoverTrigger>
            <CurrentVoiceControl
              voiceStatus={voiceStatus}
              setVoiceStatus={setVoiceStatus}
            />
          </div>
          <CurrentPopoverMain
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </Popover>
      </TooltipProvider>
    );
}