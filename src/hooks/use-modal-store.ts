import { create } from "zustand";

export type ModalType = "createServer" | "searchModal" | "openMessage";

interface ModalData {
    friends?: any[];
    email?:string
  }

interface ModalState {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
  }

export const useModalStore = create<ModalState>(set =>({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}));
