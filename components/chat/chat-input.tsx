"use client"

import {
  AiFillGift,
  AiFillPlusCircle,
  AiOutlineFileText,
  AiOutlineGif,
} from "react-icons/ai";
import InputField from "../ui/input-field";
import { CgSmileMouthOpen } from "react-icons/cg";
import { Input } from "../ui/input";

export default function ChatInput() {
  return (
    <InputField
      startIcon={
        <AiFillPlusCircle
          className="cursor-pointer hover:text-gray-200"
          size={22}
        />
      }
      endIcon={
        <div className="flex h-full cursor-pointer items-center space-x-2.5 text-gray-400 ">
          <AiFillGift className="hover:text-gray-300" size={22} />
          <AiOutlineGif className="hover:text-gray-300" size={22} />
          <AiOutlineFileText className="hover:text-gray-300" size={22} />
          <CgSmileMouthOpen className="hover:text-gray-300" size={22} />
        </div>
      }
      className="mx-6 mb-4 w-auto bg-foreground"
    >
      <Input
        className=" py-2 pl-12 pr-36 !placeholder-gray-600"
        type="text"
        // placeholder={`write something to @${user.name}`}
        value={""}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            // handleSubmit();
          }
        }}
        onChange={() => {}}
      />
    </InputField>
  );
}