import { ReactNode } from "react";

import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { SocketProvider } from "@/hooks/context/use-socket-context";

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SocketProvider>
      <div className="grid w-full h-screen grid-cols-[5rem_auto_1fr]">
        <div className="bg-[#1E1F22] w-20 h-screen">
          <NavigationSidebar />
        </div>
        {children}
      </div>
    </SocketProvider>
  );
}
