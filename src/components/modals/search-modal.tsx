"use client";

import { useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";

import { useModalStore } from "@/hooks/use-modal-store";
import UserAvatar from "../common/user-avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ListItem } from "../ui/list";
import { ScrollArea } from "../ui/scroll-area";

const SearchModal = () => {
  const { isOpen, type, onClose } = useModalStore();

  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState<any[]>([]);

  const isModalOpen = isOpen && type === "searchModal";

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-h-[360px] p-0 overflow-hidden bg-zinc-800 py-4">
        <DialogTitle className="hidden">Search</DialogTitle>
        <div className="px-6 pt-4 mt-2">
          <Input
            className="h-14 px-6"
            placeholder="Where would you like to go?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DialogDescription className="px-6">
          <span className="text-xs font-semibold text-gray-400 text-start">
            LAST CHANNELS
          </span>
        </DialogDescription>
        <ScrollArea className="px-6">
          {filteredList.length > 0 ? (
            filteredList.map((friend) => (
              <ListItem
                key={friend.id}
                noVerticalPadding
                href={`/channels/me/${friend.profileId}`}
                className="group gap-3 py-1.5"
              >
                <UserAvatar
                  src={friend.profile.imageUrl}
                  alt={friend.profile.name}
                  status={friend.status}
                  className="w-8 flex-none"
                />
                <div className="flex-1 truncate text-sm">
                  {friend.profile.name}
                  {friend.activity && (
                    <div className="h-4 truncate text-xs leading-3">
                      <span className="capitalize">
                        {friend.activity?.type}
                      </span>{" "}
                      {friend.activity?.name}{" "}
                      <BsFillChatLeftTextFill
                        fontSize={10}
                        className="ml-0.5 inline-block"
                      />
                    </div>
                  )}
                </div>
              </ListItem>
            ))
          ) : (
            <div className="text-gray-500">No friends found</div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
