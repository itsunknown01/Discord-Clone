"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/store/use-modal-store";
import CreateServerForm from "../forms/create-server-form";

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModalStore();

  const isModalOpen = isOpen && type === "createServer";

  const handleClose = () => {
    onClose()
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <CreateServerForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;