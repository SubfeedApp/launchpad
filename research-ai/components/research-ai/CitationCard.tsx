"use client";

import { ExternalLink } from "lucide-react";
import type { Source } from "@/types/research-ai";
import { cn } from "@/lib/utils";

interface CitationCardProps {
  source: Source;
  compact?: boolean;
}

export function CitationCard({ source, compact }: CitationCardProps) {
  const hostname = new URL(source.url).hostname.replace("www.", "");

  if (compact) {
    return (
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-accent text-xs hover:bg-accent/80 transition-colors"
      >
        <span className="font-medium">{source.index}</span>
      </a>
    );
  }

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 rounded-lg border hover:border-foreground/20 hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 size-5 rounded bg-accent text-xs font-medium flex items-center justify-center">
          {source.index}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium line-clamp-1">{source.title}</h4>
          <div className="flex items-center gap-1 mt-1">
            {source.favicon && (
              <img
                src={source.favicon}
                alt=""
                className="size-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <span className="text-xs text-muted-foreground truncate">
              {hostname}
            </span>
            <ExternalLink className="size-3 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {source.snippet}
          </p>
        </div>
      </div>
    </a>
  );
}
