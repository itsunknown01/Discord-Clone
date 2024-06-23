import { ReactNode } from "react";

import NavigationSidebar from "@/components/navigation/navigation-sidebar";

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid w-full h-screen grid-cols-[5rem_auto_1fr]">
      <div className="bg-[#1E1F22] w-20 h-screen">
        <NavigationSidebar />
      </div>
      {children}
    </div>
  );
}