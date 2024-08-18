"use client";

import { useModalStore } from "@/hooks/store/use-modal-store";
import { useCallback, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const MessageModal = () => {
  const { isOpen, type, data, onClose } = useModalStore();
  const isModalOpen = isOpen && type === "openMessage";

  const handleClose = () => onClose();

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#313338] text-white p-0 overflow-hidden border-none">
        <DialogHeader className="pt-8 px-6 flex items-start">
          <DialogTitle className="text-2xl text-center font-bold">
            Instruction sent
          </DialogTitle>
          <DialogDescription>
            We sent instruction to change password to {" "}
            <span className="font-semibold">{data.email}</span>
            , please check
            both your inbox and spam folder
          </DialogDescription>
        </DialogHeader>
      <DialogFooter className="px-6 py-4">
        <Button variant="default" onClick={handleClose}>
          Okay
        </Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
