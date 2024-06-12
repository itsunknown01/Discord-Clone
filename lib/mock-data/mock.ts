import { faker } from "@faker-js/faker";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const normalizeString = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const normalizedCompare = (a: string, b: string) => {
  return normalizeString(a)
    .toLowerCase()
    .includes(normalizeString(b).toLowerCase());
};


export enum StaticUserStatuses {
  Online = "online",
  Idle = "idle",
  DND = "dnd",
  Offline = "offline",
  Mobile = "mobile",
}

export type UserStatuses = StaticUserStatuses | string;

export type Activity = {
  type: ActivityTypes;
  name: string;
  since: Date;
};

export interface User {
  id: string;
  name: string;
  username?: string | null;
  bio?: string;
  avatar?: string | null;
  status: StaticUserStatuses;
  activity?: Activity | null;
  type?: "user" | "bot";
}

export const MOCK_DELAY = 2000;
export const MOCK_FRIENDS = 18;
export const MOCK_CHANNELS = 18;
export const MOCK_SERVERS = 18;

enum ActivityTypes {
  Playing = "playing",
  Streaming = "streaming",
  Listening = "listening",
  Watching = "watching",
}

export type ListedDMChannel = {
  id: string;
  name: string;
  status: StaticUserStatuses;
  activity?: Activity | null;
  avatar?: string | null;
  username?: string | null;
};

const generatePastHoursDate = (hours: number) =>
    new Date(Date.now() - hours * 60 * 60 * 1000);

const currentActivity: Activity = {
  type: ActivityTypes.Playing,
  name: "Dead by Daylight",
  since: generatePastHoursDate(5),
};

const generateRandomDiscordID = () =>
  faker.number.int({ min: 100000000000000, max: 999999999999999 }).toString();

export const generateRandomFakeChannels = (length: number): ListedDMChannel[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    status:
      i === 0
        ? StaticUserStatuses.Online
        : faker.helpers.arrayElement(Object.values(StaticUserStatuses)),
    name: faker.person.fullName(),
    avatar: i === 6 ? undefined : faker.image.avatarGitHub(),
    activity: i === 0 ? currentActivity : undefined,
    username: faker.internet.userName().toLowerCase(),
  }));

export const generateRandomFakeUsers = (length: number): User[] =>
  Array.from({ length }, (_, i) => ({
    id: generateRandomDiscordID(),
    name: faker.person.fullName(),
    username: faker.internet.userName().toLowerCase(),
    bio: faker.lorem.paragraph(),
    avatar: faker.image.avatarGitHub(),
    status: faker.helpers.arrayElement(Object.values(StaticUserStatuses)),
    activity: i === 0 ? currentActivity : undefined,
    type: "user",
  }));
