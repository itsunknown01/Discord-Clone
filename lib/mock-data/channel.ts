import { ListedServer } from "./mock";

export enum ChannelType {
    TEXT = "TEXT",
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
}

export enum MemberRole {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    GUEST = "GUEST",
}

type Member = {
    id: string;
    role: MemberRole;
    profileId: string;
    serverId: string;
    createdAt: Date;
    updatedAt: Date;
}

type Profile = {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ServerWithMemberWithProfiles = ListedServer & {
    members: (Member & { profile: Profile })[];
  };

export interface Channel {
    id: string;
    name:string
    type: ChannelType
  }[]