"use client";

import { useState } from "react";

export default function CopyToClipboard({
  text,
  buttonText,
}: {
  text: string;
  buttonText: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div>
      <p>{text}</p>
      <button onClick={handleCopyClick}>
        {copied ? "Copied" : buttonText}
      </button>
    </div>
  );
}
