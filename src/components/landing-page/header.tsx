"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { navLinks } from "@/constants/landing-page";

const Header = () => {
  const router = useRouter();
  return (
    <header className="static flex justify-center items-center max-w-[1260px] mx-auto p-[0_40px]">
      <nav className="flex items-center justify-between w-full h-[80px] ">
        <Link
          href={"/sign-up"}
          className="flex justify-center items-start gap-10"
        >
          <Image
            src="logo.svg"
            alt="icon"
            width={124}
            height={34}
            className="flex-[0_0_auto]"
          />
        </Link>
        {/* <MobileToggle type="homePage" serverId=""/>  */}
        {/* <NavLinks /> */}
        <div className="flex-[1_1_auto] text-center text-base leading-[140%] font-medium w-[933px]">
          {navLinks.map((item, index) => (
            <Link href={"/"} key={index} className="text-white m-2.5 p-2.5">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex-[0_0_auto] w-[124px] items-end flex flow-row-reverse flex-nowrap">
          <Button
            onClick={() => router.push("/login")}
            className="inline-flex leading-6 font-medium items-center whitespace-nowrap rounded-[40px] text-sm p-[7px_16px] bg-white text-black hover:bg-white"
          >
            Login
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
