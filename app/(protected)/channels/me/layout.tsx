import ConversationSidebar from "@/components/conversation/conversation-sidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ConversationSidebar />
      {children}
    </>
  );
};

export default layout;
