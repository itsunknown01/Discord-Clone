import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="flex justify-center items-center w-[780px] flex-col">
      <div className="flex flex-col justify-center items-center text-white mt-2 mb-4 relative">
        <h1 className="text-[56px] -mt-4 flex-[0_0_auto] font-extrabold leading-[95%] uppercase font-[inherit]">
          Imagine a place...
        </h1>
        <p className="mt-10 text-[clamp(16px,2vw,20px)] leading-[1.625]">
          ...where you can belong to a school club, a gaming group, or a
          worldwide art community. Where just you and a handful of friends can
          spend time together. A place that makes it easy to talk every day and
          hang out more often.
        </p>
      </div>

      <div className="flex justify-center items-center flex-wrap">
        <Link
          href={"/"}
          className="mr-[24px] mt-[24px] rounded-[28px] text-xl p-[16px_32px] bg-white text-[#23272a] leading-[24px] inline-flex font-normal items-center box-border"
        >
          <Image src="/hero.svg" alt="download icon" width={24} height={24} />
          Download for Windows
        </Link>

        <Button className="mt-[24px] rounded-[28px] text-xl p-[32px_32px] bg-[#23272a] text-white leading-[24px] inline-flex font-normal items-center box-border">
          Open Discord in your browser
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
