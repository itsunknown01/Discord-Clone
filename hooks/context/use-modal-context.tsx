"use client";

import { ReactNode, createContext, useContext, useState } from "react";

import { ModalProvider } from "@/components/providers/modal-provider";

export type ModalType = "createServer" | "searchModal" | "openMessage";

interface ModalData {
  friends?: any[];
  email?:string
}

interface ModalContextType {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<ModalType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<ModalData>({});

  const onOpen = (type: ModalType, data: ModalData = {}) => {
    setData(data);
    setType(type);
    setIsOpen(true);
  };
  
  const onClose = () => {
    setType(null);
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ type, data, isOpen, onOpen, onClose }}>
      <ModalProvider />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};