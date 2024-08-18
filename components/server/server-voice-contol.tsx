"use client";

import { useVoiceStore } from "@/hooks/store/use-voice-store";
import { Monitor, PhoneOff, Rocket, Speaker, Wifi } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsCameraVideo, BsSoundwave } from "react-icons/bs";
import { Button } from "../ui/button";

interface ServerVoiceContolProps {
  currentUser: any;
  server: any;
}

const ServerVoiceContol = ({
  currentUser,
  server,
}: ServerVoiceContolProps) => {
  const params = useParams();
  const { activeVoice,channel } = useVoiceStore();
  return (
    activeVoice && (
      <div className="bg-[#1E1F22] p-2">
        <div className="flex">
          <div className="min-w-[148px] pb-[1px]">
            <p className="flex">
              <Wifi className="w-4 h-4 mr-1" />
              <span className="text-sm">Voice Connected</span>
            </p>
            <Link
              href={`/channels/${params.serverId}/${channel?.id}`}
              className="text-sm hover:underline"
            >
              {channel?.name} / {server.name}
            </Link>
          </div>
          <div className="flex gap-1">
            <Button className="py-0 px-3">
              <BsSoundwave size={12} />
            </Button>
            <Button className="py-0 px-3">
              <PhoneOff className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <Button>
            <BsCameraVideo size={12} />
          </Button>
          <Button>
            <Monitor className="w-4 h-4" />
          </Button>
          <Button>
            <Rocket className="w-4 h-4" />
          </Button>
          <Button>
            <Speaker className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  );
};

export default ServerVoiceContol;
