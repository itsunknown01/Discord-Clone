"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import languages from "@/constants/landing-page";
import { Language } from "@/types";

const LanguageMenu = () => {
  const [selected, setSelected] = useState<Language | null>(null);

  const handleSelected = (lang: Language) => {
    setSelected(lang);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="text-black">
          {selected ? selected.name : "Select a Language"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onSelect={()=> handleSelected(lang)}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageMenu;