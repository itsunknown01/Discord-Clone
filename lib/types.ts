import { Activity, Friends, ProfileStatus, UserStatus } from "@prisma/client";
import { Socket, Server as NetServer } from "net";
import { NextApiResponse } from "next";
import { Profile } from "next-auth";
import {Server as SocketServer} from "socket.io"

export interface SocketResponse extends NextApiResponse {
    socket : Socket & {
        server: NetServer & {
            io: SocketServer
        }
    }
}

export interface VoiceStatus {
    mute?: boolean;
    deaf?: boolean;
    serverMuted?: boolean;
}

export interface FriendDataType {
    id: string;
    profileId?: string
    name: string;
    username: string
    email: string
    imageUrl: string | null
    profile_status?: UserStatus
    status?: ProfileStatus
}