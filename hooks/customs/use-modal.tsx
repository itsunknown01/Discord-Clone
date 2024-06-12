"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export type ModalType = "createServer" | "searchModal";

interface ModalContextType {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<ModalType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = (type: ModalType) => {
    setType(type);
    setIsOpen(true);
  };

  const onClose = () => {
    setType(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ type, isOpen, onOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};