"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "@/components/modals/create-server-modal";
import { SearchModal } from "@/components/modals/search-modal";
import MessageModal from "../modals/message-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <SearchModal />
      <MessageModal />
    </>
  );
};
