"use client"

import { useEffect, useState } from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";

import { useModal } from "@/hooks/context/use-modal-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListItem } from "@/components/ui/list";
import Avatar from "@/components/ui/avatar";

export const SearchModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { friends } = data;

  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState<any[]>(friends as any[]);

  const isModalOpen = isOpen && type == "searchModal";

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (search === "") setFilteredList(friends as any[]);
    else {
      setFilteredList(
        friends?.filter((friend: any) =>
          friend.profile?.name.toLowerCase().includes(search.toLowerCase())
        ) as any[]
      );
    }
  }, [search, friends]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden h-[360px]">
        <DialogHeader className="px-6 pt-8 mt-2">
          <Input
            className="h-14"
            placeholder="Where would you like to go?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </DialogHeader>
        <DialogDescription className="px-6">
          <div className="text-xs font-semibold text-gray-400">
            LAST CHANNELS
          </div>
        </DialogDescription>
        <ScrollArea className="px-6">
          {filteredList?.length > 0 ? (
            filteredList?.map((friend) => (
              <ListItem
                key={friend.id}
                noVerticalPadding
                href={`/channels/me/${friend.profile.id}`}
                className="group gap-3 py-1.5"
              >
                <Avatar
                  src={friend.profile?.imageUrl}
                  alt={friend.profile?.name}
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
