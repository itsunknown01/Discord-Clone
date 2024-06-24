import { Socket, Server as NetServer } from "net";
import { NextApiResponse } from "next";
import {Server as SocketServer} from "socket.io"

export interface SocketResponse extends NextApiResponse {
    socket : Socket & {
        server: NetServer & {
            io: SocketServer
        }
    }
}