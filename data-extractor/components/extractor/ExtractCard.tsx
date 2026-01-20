"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink, FileCode, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExtractResult } from "@/types/extractor";

interface ExtractCardProps {
  result: ExtractResult;
}

export function ExtractCard({ result }: ExtractCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = result.format === "html" ? "html" : result.format === "markdown" ? "md" : "txt";
    const blob = new Blob([result.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.title || "extracted"}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
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
            <FileCode className="size-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold truncate">{result.title || "Extracted Content"}</h2>
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
        <div className="flex items-center gap-1">
          <button
            onClick={handleDownload}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            title="Download"
          >
            <Download className="size-4 text-muted-foreground" />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
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

      {/* Content Preview */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <pre className="text-sm whitespace-pre-wrap font-mono bg-muted/50 p-4 rounded-lg overflow-x-auto">
          {result.content.slice(0, 5000)}
          {result.content.length > 5000 && (
            <span className="text-muted-foreground">... (truncated)</span>
          )}
        </pre>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t bg-muted/30 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {result.content.length.toLocaleString()} characters • {result.format}
        </p>
        {result.metadata?.language && (
          <p className="text-xs text-muted-foreground">
            Language: {result.metadata.language}
          </p>
        )}
      </div>
    </div>
  );
}
