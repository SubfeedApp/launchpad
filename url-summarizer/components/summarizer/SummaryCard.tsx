"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ScrapeResult } from "@/types/summarizer";

interface SummaryCardProps {
  result: ScrapeResult;
}

export function SummaryCard({ result }: SummaryCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result.summary) return;
    await navigator.clipboard.writeText(result.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hostname = (() => {
    try {
      return new URL(result.url).hostname.replace("www.", "");
    } catch {
      return result.url;
    }
  })();

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-4 border-b bg-muted/30">
        <div className="flex items-start gap-3 min-w-0">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="size-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold truncate">{result.title}</h2>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {hostname}
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-accent transition-colors flex-shrink-0"
          title="Copy summary"
        >
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Summary */}
      <div className="p-4">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap">{result.summary}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t bg-muted/30">
        <p className="text-xs text-muted-foreground">
          {result.content.length.toLocaleString()} characters extracted
        </p>
      </div>
    </div>
  );
}
