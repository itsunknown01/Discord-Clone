"use client";

import { postMethodhelper } from "@/helpers";
import { useMutation } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";

interface FileUploadProps {
  type: "image" | "pdf";
  value: string;
  onChange: (value: string) => void;
}

export default function FileUpload({ type, value, onChange }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: fileUpload } = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: (formData: FormData) =>
      postMethodhelper("/api/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: ({ url }) => onChange(url),
    onError: (error) => console.error("Error uploading file:", error),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      fileUpload(formData);
    }
  };

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
        className="w-[250px] h-[150px] text-base text-[#5d4dcc] border-dashed border-[1.5px] border-[#5d4dcc] rounded-[22px] font-medium flex flex-col items-center justify-center gap-3"
      >
        <Upload className="h-8 w-8" />
        Upload File
      </button>
      <input
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        type="file"
      />
    </>
  );
}
