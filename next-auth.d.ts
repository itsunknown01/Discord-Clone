import {type DefaultSession } from "next-auth";

export type IUser = DefaultSession["user"] & {
    username: string
}

declare module "next-auth" {
    interface Session {
        user: IUser
    }
}