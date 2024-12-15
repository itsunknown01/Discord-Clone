export interface SocialLinksTypes {
  name: string;
  link: string;
  icon: React.ElementType;
}

export interface Language {
  code: string;
  name: string;
}

export type Server = {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;
  profileId: string;
};

export enum UserStatus {
  Online = "Online",
  Idle = "Idle",
  DND = "DND",
  Offline = "Offline",
  Mobile = "Mobile",
  Blocked = "Blocked",
}

export enum FriendType {
  User = "User",
  Bot = "Bot",
}

export interface VoiceStatus {
  mute?: boolean;
  deaf?: boolean;
  serverMuted?: boolean;
}

export type Profile = {
  id: string;
  userId: string;
  name: string;
  email: string;
  username: string;
  imageUrl?: string | null;
  status: UserStatus;
};

export type Friends = {
  id: string;
  status: UserStatus;
  type: FriendType;
  profileId: string;
  friendId: string;
};

export type FriendsWithProfile = {
  id: string;
  status: UserStatus;
  type: FriendType;
  profileId: string;
  friendId: string;
  profile: Profile;
};

export enum MemberRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  GUEST = "GUEST",
}

export enum ChannelType {
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
}

export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  categoryId: string | null;
  profileId: string;
  serverId: string;
  createdAt: Date;
  updatedAt: Date;
};