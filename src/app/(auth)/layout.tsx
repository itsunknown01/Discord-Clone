import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      <Image
        src="/discord-background.svg"
        alt="background"
        width={100}
        height={100}
        className="fixed left-0 top-0 w-full h-full -z-30 lg:block hidden"
      />
      <Image
        src="/discord-icon.svg"
        alt="discord icon"
        width={124}
        height={24}
        className="absolute top-12 left-12 lg:block hidden"
      />
      {children}
    </div>
  );
}