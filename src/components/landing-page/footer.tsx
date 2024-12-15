"use client";

import { footerSectionsData, socialLinks } from "@/constants/landing-page";
import Link from "next/link";
import React from "react";
import LanguageMenu from "./language-menu";

const Footer = () => {
  return (
    <footer className="w-full bg-[#23272a] pt-[80px] pb-[64px] text-white flex items-center flex-col">
      <div className="w-full m-w-[1260px] h-[396px] flex justify-center py-0 px-[40px] gap-[0_20px]">
        <div className="flex flex-col mb-[56px] items-start mr-[80px] w-[280px]">
          <div>
           <LanguageMenu/>
          </div>
          <div className="mt-[24px] flex items-center gap-6">
            {socialLinks.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="w-[24px] h-[24px] object-contain"
              >
                <item.icon />
              </Link>
            ))}
          </div>
        </div>
        {footerSectionsData.map((item) => (
          <div key={item.title} className="mb-[40px] flex flex-col w-[180px]">
            <h5 className="text-[#5865f2] mb-[20px] text-base">{item.title}</h5>
            {item.content.map((links, index) => (
              <Link key={index} href={""} className="block mt-2 gap-y-2">
                {links.link}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;