"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Progress } from "../ui/progress";

interface FileUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FileUpload({ value, onChange }: FileUploadProps) {
  const [selectImage,setSelectImage] = useState<File| null>(null)
  const [progress,setProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null);

  const onChoseFile = () => {
    if (inputRef.current) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
       setSelectImage(e.target.files[0]);
  };
  }

  return (
    <>
      <Input
        value={value}
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        type="file"
      />
      {!value && (
        <button
          onClick={onChoseFile}
          className="w-[250px] h-[150px] text-base text-[#5d4dcc] border-dashed border-[1.5px] border-[#5d4dcc] rounded-[22px] font-medium flex flex-col items-center justify-center gap-3"
        >
          <Upload className="h-8 w-8" />
          <span></span>Upload File
        </button>
      )}
      {value && (
        <div className="relative h-20 w-20">
          <Image fill src={value} alt="Upload" className="full" />

          <Progress value={progress} />
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}