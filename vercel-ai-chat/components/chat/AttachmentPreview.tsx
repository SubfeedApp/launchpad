"use client";

import { X, FileText, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttachmentPreviewProps {
  files: File[];
  onRemove: (index: number) => void;
  className?: string;
}

export function AttachmentPreview({
  files,
  onRemove,
  className,
}: AttachmentPreviewProps) {
  if (files.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2 p-2", className)}>
      {files.map((file, index) => (
        <AttachmentItem
          key={index}
          file={file}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  );
}

function AttachmentItem({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) {
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";

  return (
    <div className="relative group">
      <div className="w-16 h-16 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : isPdf ? (
          <FileText className="size-6 text-muted-foreground" />
        ) : (
          <File className="size-6 text-muted-foreground" />
        )}
      </div>
      <button
        onClick={onRemove}
        className={cn(
          "absolute -top-1 -right-1 p-0.5 rounded-full",
          "bg-foreground text-background",
          "opacity-0 group-hover:opacity-100 transition-opacity"
        )}
      >
        <X className="size-3" />
      </button>
      <div className="w-16 text-xs truncate text-center mt-1 text-muted-foreground">
        {file.name}
      </div>
    </div>
  );
}
