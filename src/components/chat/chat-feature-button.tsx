"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CirclePlus, Plus, Upload } from "lucide-react";

const ChatFeatureButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="bg-white rounded-full p-1">
        <Plus className="h-4 w-4 text-zinc-700" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[200px] mb-1 bg-zinc-900 border-none text-white space-y-1 p-2"
      >
        <Button className="bg-inherit w-full justify-start">
          <Upload className="h-4 w-4 mr-2" />
          Upload a File
        </Button>
        <Button className="bg-inherit w-full justify-start">
          <CirclePlus className="h-4 w-4 mr-2" />
          Create a Poll
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ChatFeatureButton;