"use client";

import { useRef } from "react";
import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttachmentButtonProps {
  onAttach: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AttachmentButton({
  onAttach,
  accept = "image/*,.pdf,.doc,.docx,.txt",
  multiple = true,
  disabled,
  className,
}: AttachmentButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onAttach(files);
      e.target.value = "";
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "p-2 rounded-lg hover:bg-accent transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        title="Attach files"
      >
        <Paperclip className="size-5 text-muted-foreground" />
      </button>
    </>
  );
}
