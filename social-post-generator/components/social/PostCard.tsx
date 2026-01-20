"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPlatformConfig } from "@/lib/social";
import type { Platform } from "@/types/social";

interface PostCardProps {
  platform: Platform;
  content: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export function PostCard({
  platform,
  content,
  onRegenerate,
  isRegenerating,
}: PostCardProps) {
  const [copied, setCopied] = useState(false);
  const config = getPlatformConfig(platform);
  const charCount = content.length;
  const isOverLimit = charCount > config.maxLength;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center size-6 rounded bg-muted text-xs font-bold">
            {config.icon}
          </span>
          <span className="font-medium text-sm">{config.name}</span>
        </div>
        <div className="flex items-center gap-1">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="p-1.5 rounded-md hover:bg-accent transition-colors disabled:opacity-50"
              title="Regenerate"
            >
              <RefreshCw
                className={cn(
                  "size-4 text-muted-foreground",
                  isRegenerating && "animate-spin"
                )}
              />
            </button>
          )}
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
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t bg-muted/30">
        <span
          className={cn(
            "text-xs",
            isOverLimit ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {charCount.toLocaleString()} / {config.maxLength.toLocaleString()} characters
        </span>
      </div>
    </div>
  );
}
