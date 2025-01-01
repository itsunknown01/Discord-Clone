import { FriendsTabEnum } from "@/constants/me-page";
import { UserStatus } from "@/types";
import { BsChatLeftFill, BsCheck2, BsThreeDotsVertical, BsX } from "react-icons/bs";
import UserAvatar from "../common/user-avatar";
import { ListItem } from "../ui/list";
import RoundedButton from "../ui/rounded-button";

interface MeFriendItemProps {
  tab: {
    id: FriendsTabEnum;
    title: string;
    name?: string;
    status?: UserStatus[];
    empty: {
      imageSrc: string;
      imageAlt: string;
      text: string;
    };
  };
  friend: any;
}

const MeFriendItem = ({ tab, friend }: MeFriendItemProps) => {
  return (
    <ListItem
      href={
        tab.id === FriendsTabEnum.Pending
          ? ""
          : `/channels/me/${friend?.profileId}`
      }
      className={`group justify-between border-t-[1px] border-zinc-800 py-2.5 pr-3 `}
      noVerticalPadding
    >
      <div className="flex items-center gap-3">
        <UserAvatar
          src={friend!.imageUrl}
          alt={friend.name}
          className="flex-none"
          status={
            tab.id === FriendsTabEnum.Pending
              ? undefined
              : friend.status
          }
        />
        <div className="flex-1 leading-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-200">
            <span className="font-semibold">{friend?.name}</span>
            <span className="hidden text-xs text-gray-400 group-hover:block">
              {friend.username}
            </span>
          </div>
          <div className="text-[13px] text-gray-300">
            {tab.id === FriendsTabEnum.Pending
              ? "Incoming Friend Request"
              : `${friend.status}`}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        {tab.id === FriendsTabEnum.Pending ? (
          <>
            <RoundedButton
              className="!p-1.5"
            //   onClick={handleAcceptFriends}
              tooltipContent="Accept"
            >
              <BsCheck2 size={23} />
            </RoundedButton>
            <RoundedButton
            //   onClick={handleDeclineFriends}
              className="!p-1.5"
              tooltipContent="Decline"
            >
              <BsX size={23} />
            </RoundedButton>
          </>
        ) : (
          <>
            <RoundedButton
            //   onClick={handleAddConversation}
              tooltipContent="Message"
            >
              <BsChatLeftFill />
            </RoundedButton>
            <RoundedButton tooltipContent="More">
              <BsThreeDotsVertical />
            </RoundedButton>
          </>
        )}
      </div>
    </ListItem>
  );
};

export default MeFriendItem;
