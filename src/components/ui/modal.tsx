"use client";

import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  title: string | JSX.Element;
  description: string | JSX.Element;
  children: ReactNode;
  className?: string;
}

const Modal = ({
  isModalOpen,
  handleClose,
  description,
  title,
  children,
  className,
}: ModalProps) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className={cn("p-0 overflow-hidden", className)}>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
