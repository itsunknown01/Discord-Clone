import { Activity, Friends } from "@prisma/client";
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

export interface FriendsType extends Friends {
    profile?: Profile
    friend?: Profile
    activity?: Activity
}

export interface VoiceStatus {
    mute?: boolean;
    deaf?: boolean;
    serverMuted?: boolean;
}