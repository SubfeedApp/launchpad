"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
  className?: string;
}

export function MessageActions({
  content,
  onRegenerate,
  className,
}: MessageActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
        className
      )}
    >
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md hover:bg-accent transition-colors"
        title="Copy"
      >
        {copied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4 text-muted-foreground" />
        )}
      </button>
      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="p-1.5 rounded-md hover:bg-accent transition-colors"
          title="Regenerate"
        >
          <RefreshCw className="size-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}
