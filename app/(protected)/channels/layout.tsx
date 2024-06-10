import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { ReactNode } from "react";

const ChannelLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='grid w-screen h-screen grid-cols-[5rem_auto_1fr]'>
        <div className='bg-[#1E1F22]'>
            <NavigationSidebar />
        </div>
        <main>
      {/* {children} */}
        </main>
    </div>
  );
};

export default ChannelLayout;
