"use client";

import { Camera, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface FileUploadProps {
  type: "image" | "pdf";
  value: string;
  onChange: (value: string) => void;
}

const FileUpload = ({ type, value, onChange }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {};

  if (type === "image" && value) {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="object-contain rounded-[50px]"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        className="w-[100px] h-[100px] text-base text-zinc-200 border-dashed border-[1.5px] border-zinc-200 rounded-full font-medium flex flex-col items-center justify-center relative"
      >
        <div className="absolute top-0 right-1.5 rounded-full bg-[#5d4dcc] p-1">
          <Plus className="w-4 h-4 text-zinc-200" />
        </div>
        <Camera className="h-8 w-8" />
        Upload
      </button>
      <input
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        type="file"
      />
    </>
  );
};

export default FileUpload;