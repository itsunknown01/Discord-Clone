import { UserStatus } from "@/types";
import { BsPersonFill, BsShop, BsStars } from "react-icons/bs";

export const conversationMenuItems = [
  { href: "/channels/me", icon: BsPersonFill, name: "Friends", count: 24 },
  { href: "/nitro", icon: BsStars, name: "Nitro", count: 0 },
  { href: "/shop", icon: BsShop, name: "Shop", count: 0 },
];

const FRIENDS_EMPTY_PROP = {
  imageSrc: "/NotFoundSearching.svg",
  imageAlt: "No friends found",
  text: "we can't find anyone with that name :(",
};

export enum FriendsTabEnum {
  Online = "Online",
  All = "All",
  Pending = "Pending",
  Blocked = "Blocked",
  AddFriend = "AddFriend",
}

export const friendsTabs = [
  {
    id: FriendsTabEnum.Online,
    title: "Online",
    status: [
      UserStatus.Online,
      UserStatus.DND,
      UserStatus.Idle,
      UserStatus.Mobile,
    ],
    empty: FRIENDS_EMPTY_PROP,
  },
  {
    id: FriendsTabEnum.All,
    title: "All Your Friends",
    name: "All",
    status: Object.values(UserStatus),
    empty: FRIENDS_EMPTY_PROP,
  },
  {
    id: FriendsTabEnum.Pending,
    title: "Pending",
    empty: {
      imageSrc: "/Waiting.svg",
      imageAlt: "No friend requests",
      text: "Looks like no one requested to be your friend :(",
    },
  },
  {
    id: FriendsTabEnum.Blocked,
    title: "Blocked",
    empty: {
      imageSrc: "/Waiting.svg",
      imageAlt: "No blocked friends",
      text: "You haven't blocked anyone :)",
    },
  },
  {
    id: FriendsTabEnum.AddFriend,
    title: "Add a Friend",
    empty: FRIENDS_EMPTY_PROP,
  },
];
